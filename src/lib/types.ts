export type Interval =
	| 'Pre-Op'
	| 'One Day'
	| 'One Month'
	| 'Three Months'
	| 'Six Months'
	| 'Twelve Months';
export type ODOS = ['OD'] | ['OS'] | ['OD', 'OS'];
import type { Database } from '../DatabaseDefinitions';
export type Patient = Database['public']['Tables']['patient']['Row'];
export type Reading = Database['public']['Tables']['reading']['Row'];
export type Medication = Database['public']['Tables']['medication']['Row'];
export type VisitIndex = {
	[k in Interval[number]]: Reading | Medication;
};
