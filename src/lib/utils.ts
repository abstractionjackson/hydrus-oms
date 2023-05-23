import { INTERVALS } from './constants';
import type { Patient, Reading } from './types';

const toAverage = (acc: number, curr: number, _: any, arr: number[]): number =>
	acc + curr / arr.length;

export const intervalFromDates = (case_date: Date, date: Date): string => {
	// intervals are one day, one month, three months, six months, and twelve months
	// if the difference between the case date and the reading date is less than 30 days, it's one day
	// if the difference is less than 90 days, it's one month
	// if the difference is less than 180 days, it's three months
	// if the difference is less than 365 days, it's six months
	// if the difference is greater than 365 days, it's twelve months
	const diff = Math.abs(date.getTime() - case_date.getTime());
	const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
	switch (true) {
		case diffDays < 30:
			return INTERVALS[0];
		case diffDays < 90:
			return INTERVALS[1];
		case diffDays < 180:
			return INTERVALS[2];
		case diffDays < 365:
			return INTERVALS[3];
		default:
			return INTERVALS[4];
	}
};

export const getReadingAvgByInterval = (
	patients: Array<Patient & { reading: Reading[] }>
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
					acc[interval].push(reading.iop);
				} else {
					acc[interval] = [reading.iop];
				}
			});
			return acc;
		},
		{}
	);
	// indices of the return array correspond to the indices of the INTERVALS array
	return INTERVALS.map((interval: string) => readingsByInterval[interval]?.reduce(toAverage, 0));
};
