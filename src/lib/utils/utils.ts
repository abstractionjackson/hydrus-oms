import type { HOMSInterval, Patient, Reading } from '$types';
import { HOMS_INTERVAL } from '$lib/constants';
import { DateTime, Interval } from 'luxon';
import { IntervalMap } from '$lib/models';

export function getReadingInterval({
	reading,
	caseDate,
}: { reading: Reading, caseDate: Patient['case_date']}): Interval {
	return Interval.fromDateTimes(
		DateTime.fromISO(caseDate),
		DateTime.fromISO(reading.date),
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
	if(Math.floor(interval.length('months')) === 1) {
		return HOMS_INTERVAL[2];
	}
	if(Math.floor(interval.length('months')) === 3) {
		return HOMS_INTERVAL[3];
	}
	if(Math.floor(interval.length('months')) === 6) {
		return HOMS_INTERVAL[4];
	}
	if(Math.floor(interval.length('months')) === 12) {
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
		const { case_date, reading } = patient;
		const patientIntervalMap = new IntervalMap({ readings: reading, caseDate: case_date});
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
export function isPostOp(reading: Pick<Reading, "date">, case_date: string) {
	return new Date(reading.date).getTime() > new Date(case_date).getTime();
};
export function getPreOpReading(
	reading: Reading[],
	case_date: string
): Reading | undefined {
	return reading.find((reading) => !isPostOp(reading, case_date)) as Reading;
};
export function getReadingArray(reading: Reading | Reading[] | null | undefined) {
	if(!reading) {
		return []
	} else if (!Array.isArray(reading)) {
		return [reading]
	} else {
		return reading
	}

}