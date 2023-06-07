import { describe, expect, test } from 'vitest';
import { IntervalMap } from "./models";
import { patients, readings as mockReadings } from "$test/data";
import { HOMS_INTERVAL } from '$lib/constants';
import type { Reading } from '$types';
import { formatInterval, getReadingInterval } from '$lib/utils';

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