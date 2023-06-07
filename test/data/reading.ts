import type { HOMSInterval, Reading } from '$types';
import { HOMS_INTERVAL } from '$lib/constants';
import { patients } from './patient';
import { DateTime } from 'luxon';
const patient = patients[0];
const DEFAULT_ID = 1;
const DEFAULT_DATE = patient.case_date;
//default iop is a random int between 20 and 25
function getRandomIop() {
    return Math.floor(Math.random() * 5) + 20;
}
const DEFAULT_IOP = getRandomIop();
//default medication is a random int between 0 and 3
function getRandomMedication() {
    return Math.floor(Math.random() * 3);
}
const DEFAULT_MEDICATION = getRandomMedication();
const DEFAULT_PATIENT = patient.id;

function getDateFromInterval(source: string, interval: HOMSInterval): DateTime {
    const date = DateTime.fromISO(source);
    switch (interval) {
        case 'Pre-Op':
            return date.minus({ days: 1 });
        case 'One Day':
            return date.plus({ days: 1 });
        case 'One Month':
            return date.plus({ months: 1 });
        case 'Three Months':
            return date.plus({ months: 3 });
        case 'Six Months':
            return date.plus({ months: 6 });
        case 'Twelve Months':
            return date.plus({ months: 12 });
        default:
            return date;
    };
};

export const readings:Reading[][] = patients
.map(({ id, case_date }) => {
    return HOMS_INTERVAL
    .map((interval) => {
        const date = getDateFromInterval(case_date, interval);
        return {
            id: DEFAULT_ID,
            date: date.toISODate() as string,
            iop: getRandomIop(),
            medication: getRandomMedication(),
            patient: id,
        }
    });
});
