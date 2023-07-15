import { HOMS_INTERVAL } from "$lib/constants";
import { formatInterval, getReadingInterval } from "$lib/utils";
import type { HOMSInterval, Patient, Reading } from "$types"
import { Interval, DateTime } from "luxon";

type IntervalMapParams = {
    readings: Reading[],
    caseDate: Patient['case_date']
}
export class IntervalMap extends Map {
    constructor({
        readings,
        caseDate
    }: IntervalMapParams) {
        super();
        for(const interval of HOMS_INTERVAL) {
            this.set(
                interval,
                readings
                .filter(
                    reading => formatInterval(
                        getReadingInterval({
                            reading,
                            caseDate
                        })
                    ) === interval
                )
            );
        };
    };
    
    add(interval: HOMSInterval, reading: Reading) {
        const readings = this.get(interval) as Reading[];
        this.set(interval, [...readings, reading]);
    };
}

type ReadingDiffParams = {
    initialReading: Reading,
    subsequentReading: Reading
};
export class ReadingDiff {
    interval: Interval;
    iopDelta: number;
    medicationDelta: number;
    constructor({
        initialReading,
        subsequentReading
    }: ReadingDiffParams) {
        this.interval = Interval.fromDateTimes(
            DateTime.fromISO(initialReading.date),
            DateTime.fromISO(subsequentReading.date)
        );
        this.iopDelta = subsequentReading.iop - initialReading.iop;
        this.medicationDelta = subsequentReading.medication - initialReading.medication;
    };
}