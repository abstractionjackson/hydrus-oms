// import type { Database } from '$types/DatabaseDefinitions';
import type { Interval } from 'luxon';
import type { Database } from './DatabaseDefinitions';

export type IopReading = Database['public']['Tables']['iop_readings']['Row'];
export type MedicationReading = Database['public']['Tables']['medication_readings']['Row'];
export type Patient = Database['public']['Tables']['patients']['Row']
& {
	iop_readings: IopReading[],
	medication_readings: MedicationReading[]
};
export type HOMSInterval =
	| 'Pre-Op'
	| 'One Day'
	| 'One Month'
	| 'Three Months'
	| 'Six Months'
	| 'Twelve Months';
export type ReadingDiff = {
	interval: Interval;
	iopDelta: number;
	medicationDelta: number;
}