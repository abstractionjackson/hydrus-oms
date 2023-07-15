import type { HOMSInterval, IopReading, MedicationReading, Patient, Reading, ReadingDiff } from '$types';
import { HOMS_INTERVAL } from '$lib/constants';
import { DateTime, Interval } from 'luxon';
import { IntervalMap } from '$lib/models';

export function getReadingInterval({
	reading,
	caseDate,
}: { reading: Reading, caseDate: Patient['operation_date']}): Interval {
	return Interval.fromDateTimes(
		DateTime.fromISO(caseDate),
		DateTime.fromISO(reading.date),
	);
};

interface GetIntervalParams {
	reading: IopReading | MedicationReading;
	patient: Patient;
}
export function getInterval({
	reading,
	patient
}: GetIntervalParams) {
	const { operation_date } = patient;
	const { date } = reading;
	return Interval.fromDateTimes(
		DateTime.fromISO(operation_date),
		DateTime.fromISO(date),
	);
};

export function formatInterval(interval: Interval): HOMSInterval {
	// if the interval is before the case date, it is 'pre-op'
	if(!interval.isValid) {
		return HOMS_INTERVAL[0];
	}
	if(Math.round(interval.length('days')) === 1) {
		return HOMS_INTERVAL[1];
	}
	if(Math.round(interval.length('months')) === 1) {
		return HOMS_INTERVAL[2];
	}
	if(Math.round(interval.length('months')) === 3) {
		return HOMS_INTERVAL[3];
	}
	if(Math.round(interval.length('months')) === 6) {
		return HOMS_INTERVAL[4];
	}
	if(Math.round(interval.length('months')) === 12) {
		return HOMS_INTERVAL[5];
	}
	console.error(
		new Error('Invalid interval: ' + interval)
	);
	// tmp
	return HOMS_INTERVAL[0];
};

export function getPatientsIntervalMap(patients: Array<Patient & { reading: Reading[] }>) {
	const intervalMap = new IntervalMap({ readings: [], caseDate: "" });
	for(const patient of patients) {
		const { operation_date, reading } = patient;
		const patientIntervalMap = new IntervalMap({ readings: reading, caseDate: operation_date});
		for(const [interval, readings] of patientIntervalMap.entries()) {
			// interval is a HOMSInterval, readings is an array of Reading
			readings.forEach((reading: Reading) => intervalMap.add(interval, reading));
		};
	};
	return intervalMap;
};

export function getPreviousDate(isoString: string) {
	// Parse the ISO string into a Date object.
	const date = new Date(isoString);

	// Subtract one day from the Date object.
	date.setDate(date.getDate() - 1);

	// Return the previous date as an ISO string.
	return date.toISOString();
}
export function isPostOp(reading: Pick<Reading, "date">, operation_date: string) {
	return new Date(reading.date).getTime() > new Date(operation_date).getTime();
};
export function getPreOpReading(
	reading: Reading[],
	operation_date: string
): Reading {
	const preOpReading = reading.find((reading) => !isPostOp(reading, operation_date));
	if (!preOpReading) {
		throw new Error('No pre-op reading found');
	}
	return preOpReading;
};
export function getReadingArray(reading: Reading | Reading[] | null | undefined) {
	if(!reading) {
		return []
	} else if (!Array.isArray(reading)) {
		return [reading]
	} else {
		return reading
	}

};

export 	function getPatientReadingAverages(intervalMap: IntervalMap, key: 'iop' | 'medication'): number[] {
	const averages: number[] = [];
	for (const [interval, value] of intervalMap.entries()) {
		if (value.length === 0) continue;
		const averageIop =
			value.reduce((acc: number, reading: Reading) => acc + reading[key], 0) /
			value.length;
		averages.push(averageIop);
	}
	return averages;
};

type MapDiffToReadingParams = {
	reading: Reading,
	readingDiff: ReadingDiff
}
export function mapDiffToReading({
	reading,
	readingDiff,
}: MapDiffToReadingParams): Reading & Pick<ReadingDiff, "iopDelta" | "medicationDelta"> {
	return {
		...reading,
		iopDelta: readingDiff.iopDelta,
		medicationDelta: readingDiff.medicationDelta,
	};
}