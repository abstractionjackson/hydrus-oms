import { assert, expect, test } from 'vitest';
import { readings as mockReadings, patients as mockPatients } from '$test/data';
import type { Patient, Reading } from '$types';
import { DateTime, Interval } from 'luxon';
import { HOMS_INTERVAL } from '$lib/constants';
import { IntervalMap, ReadingDiff } from '$lib/models';
import {
	formatInterval,
	getPatientReadingAverages,
	getPatientsIntervalMap,
	getPreOpReading,
	getReadingInterval,
	isPostOp,
	mapDiffToReading
} from './utils';

// Setup
const patients = [...mockPatients];
const patient = patients[0]; // get the first patient
const patientReadings = [...mockReadings]
	.flat()
	.filter((reading) => reading.patient === patient.id);

// Tests
test('getReadingInterval', () => {
	const intervals = patientReadings.map(({ date }) => {
		return Interval.fromDateTimes(DateTime.fromISO(patient.case_date), DateTime.fromISO(date));
	});
	const result = patientReadings.map((reading) =>
		getReadingInterval({
			reading,
			caseDate: patient.case_date
		})
	);
	expect(result).toEqual(intervals);
});

test('formatInterval', () => {
	// Given an interval, return a HOMSInterval
	for (const i in HOMS_INTERVAL) {
		expect(
			formatInterval(
				getReadingInterval({
					reading: patientReadings[i],
					caseDate: patient.case_date
				})
			)
		).toEqual(HOMS_INTERVAL[i]);
	}
});

test('getPatientsIntervalMap', () => {
	// given a list of patients
	// getPatientsIntervalMap returns an IntervalMap
	// of all readings
	const patients: Array<Patient & { reading: Reading[] }> = [...mockPatients].map((patient) => {
		return {
			...patient,
			reading: mockReadings.flat().filter((reading) => reading.patient === patient.id)
		};
	});
	//this test is failing inexplicably:
	const result = getPatientsIntervalMap(patients);
	expect(result).toBeDefined();
	expect(result).toBeInstanceOf(IntervalMap);
});

test('isPostOp', () => {
	// Given a reading, and a case date
	// return a boolean indicating whether the reading is post-op
	const reading: Pick<Reading, 'date'> = {
		date: '2021-01-01'
	};
	const preReadingOpDate: Patient['case_date'] = '2020-12-31';
	const postReadingOpDate: Patient['case_date'] = '2021-01-02';
	assert(isPostOp(reading, postReadingOpDate) === false);
	assert(isPostOp(reading, preReadingOpDate) === true);
});

test('getPreOpReading', () => {
	// Given a list of readings and a case date
	// return the reading that is before the case date
	const caseDate: Patient['case_date'] = patient.case_date;
	const readings: Reading[] = mockReadings.flat();
	const preOpReading = getPreOpReading(readings, caseDate);
	// expect the preOpReading.date to be before the caseDate
	expect(new Date(preOpReading.date).getTime() < new Date(caseDate).getTime()).toBe(true);
});

test('getPatientReadingAverages', () => {
	const patients = [...mockPatients].map((patient) => {
		return {
			...patient,
			reading: mockReadings.flat().filter((reading) => reading.patient === patient.id)
		};
	});
	const key: "iop" | "medication" | "iopDelta" | "medicationDelta" = 'iop';
	const averages = getPatientReadingAverages(
		getPatientsIntervalMap(patients),
		key
	);
	expect(averages).toBeInstanceOf(Array);
	expect(averages[0]).toBeTypeOf('number');
});

test('mapDiffToReading', () => {
	// given a Reading and a ReadingDiff, return an object
	// that has the Reading data, and the ReadingDiff iop and medication deltas
	// Steps
	const preOpReading = getPreOpReading(patientReadings, patient.case_date);
	const subsequentReading = patientReadings[1];
	const readingDiff = new ReadingDiff({
		initialReading: preOpReading,
		subsequentReading
	});
	const expected = {
		...subsequentReading,
		iopDelta: readingDiff.iopDelta,
		medicationDelta: readingDiff.medicationDelta
	};
	const result = mapDiffToReading({
		reading: subsequentReading,
		readingDiff
	});
	expect(result).toEqual(expected);
})