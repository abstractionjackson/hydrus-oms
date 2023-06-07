import { HOMS_INTERVAL } from "$lib/constants";
import { formatInterval, getReadingInterval } from "$lib/utils";
import type { HOMSInterval, Patient, Reading } from "$types"

type Params = {
    readings: Reading[],
    caseDate: Patient['case_date']
}
export class IntervalMap extends Map {
    constructor({
        readings,
        caseDate
    }: Params) {
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