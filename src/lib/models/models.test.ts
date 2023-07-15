import { describe, expect, test } from 'vitest';
import { IntervalMap, ReadingDiff } from "./models";
import { patients, readings as mockReadings } from "$test/data";
import { HOMS_INTERVAL } from '$lib/constants';
import type { Reading } from '$types';
import { formatInterval, getReadingInterval } from '$lib/utils';
import { DateTime, Interval } from 'luxon';

const defaultPatient = patients[0];
const caseDate = defaultPatient.case_date;
const readings: Reading[] = mockReadings.flat().filter(reading => reading.patient === defaultPatient.id);

const intervalMap = new IntervalMap({
    readings,
    caseDate
});

describe('IntervalMap', () => {

    test('constructor', () => {
        expect(intervalMap).toBeDefined();
        expect(intervalMap).toBeInstanceOf(IntervalMap);
        for(const key in intervalMap) {
            expect(HOMS_INTERVAL).toContain(key);
        };
    });
    
    test('add', () => {
        // given an interval and a reading, add the reading to the interval
        const preOpReading = readings.find(reading => reading.date < caseDate) as Reading;
        const interval = formatInterval(getReadingInterval({
            reading: preOpReading,
            caseDate
        }));
        const intervalMap = new IntervalMap({
            readings,
            caseDate
        });
        intervalMap.add(interval, preOpReading);
        expect(intervalMap.get(interval)).toContain(preOpReading);
    });

});

describe('ReadingDiff', () => {
    // differentiates the dates and values of two readings
    test('constructor', () => {
        // get the pre-op reading
        const preOpReading = readings.find(reading => reading.date < caseDate) as Reading;
        // get the one day reading
        const oneDayReading = readings.find(reading => reading.date > caseDate) as Reading;
        // get an interval between the one day and pre-op readings
        const preOpDate = preOpReading.date
        const oneDayDate = oneDayReading.date;
        const interval = Interval.fromDateTimes(
            DateTime.fromISO(preOpDate),
            DateTime.fromISO(oneDayDate)
        );
        // get the difference between iop
        const iopDelta = oneDayReading.iop - preOpReading.iop;
        // get the difference between medication
        const medicationDelta = oneDayReading.medication - preOpReading.medication;
        // create a ReadingDiff
        const readingDiff = new ReadingDiff({
            initialReading: preOpReading,
            subsequentReading: oneDayReading
        });
        // expect the ReadingDiff to have the correct values
        expect(readingDiff.interval).toEqual(interval);
        expect(readingDiff.iopDelta).toEqual(iopDelta);
        expect(readingDiff.medicationDelta).toEqual(medicationDelta);
    });
})