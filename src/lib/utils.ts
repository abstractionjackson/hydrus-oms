import { INTERVALS } from './constants';
import type { Interval, Patient, Reading } from './types';

const toAverage = (acc: number, curr: number, _: any, arr: number[]): number =>
	acc + curr / arr.length;

export const intervalFromDates = (case_date: Date, date: Date): Interval => {
	// intervals are one day, one month, three months, six months, and twelve months
	// if the difference between the case date and the reading date is less than 30 days, it's one day
	// if the difference is less than 90 days, it's one month
	// if the difference is less than 180 days, it's three months
	// if the difference is less than 365 days, it's six months
	// if the difference is greater than 365 days, it's twelve months
	// if the date is before the case date, it is 'pre-op'
	const diff = date.getTime() - case_date.getTime();
	if (diff < 0) {
		return INTERVALS[0];
	}
	const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
	switch (true) {
		case diffDays < 30:
			return INTERVALS[1];
		case diffDays < 90:
			return INTERVALS[2];
		case diffDays < 180:
			return INTERVALS[3];
		case diffDays < 365:
			return INTERVALS[4];
		default:
			return INTERVALS[5];
	}
};
export const getReadingAvgByInterval = (
	patients: Array<Patient & { reading: Reading[] }>,
	key: 'iop' | 'medication'
): number[] => {
	const readingsByInterval = patients.reduce(
		(
			acc: {
				[key: string]: number[];
			},
			patient: Patient & { reading: Reading[] }
		) => {
			const { case_date } = patient;
			const readings = patient.reading;
			readings.forEach((reading: Reading) => {
				const interval = intervalFromDates(new Date(case_date || ''), new Date(reading.date));
				if (acc[interval]) {
					acc[interval].push(reading[key]);
				} else {
					acc[interval] = [reading[key]];
				}
			});
			return acc;
		},
		{}
	);
	// indices of the return array correspond to the indices of the INTERVALS array
	return INTERVALS.map((interval: string) => readingsByInterval[interval]?.reduce(toAverage, 0));
};
export function handleArrayResult<T>(result: T | T[] | null): T[] {
	if (Array.isArray(result)) {
		return result;
	}
	if (result === null) {
		return [];
	}
	return [result];
}
export function getPreOpReading(
	patient: Pick<Patient, 'case_date'> & { reading: Reading[] },
	key: 'iop' | 'medication'
): number {
	const { case_date, reading } = patient;
	const preOpReading = reading.find(({ date }: Reading) => {
		return new Date(date).getTime() < new Date(case_date ?? '').getTime();
	});
	return preOpReading ? preOpReading[key] : 0;
}
export function getPreviousDate(isoString: string) {
	// Parse the ISO string into a Date object.
	const date = new Date(isoString);

	// Subtract one day from the Date object.
	date.setDate(date.getDate() - 1);

	// Return the previous date as an ISO string.
	return date.toISOString();
}
