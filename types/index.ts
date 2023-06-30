// import type { Database } from '$types/DatabaseDefinitions';
import type { Interval } from 'luxon';
import type { Database } from './DatabaseDefinitions';

export type Patient = Omit<Database['public']['Tables']['patient']['Row'], 'created_at'>;
export type Reading = Omit<Database['public']['Tables']['reading']['Row'], 'created_at'>;
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