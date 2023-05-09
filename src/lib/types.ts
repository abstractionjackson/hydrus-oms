export type ODOS = ['OD'] | ['OS'] | ['OD', 'OS'];
import type { Database } from '../DatabaseDefinitions';
export type Patient = Database['public']['Tables']['patient']['Row'];
export type Reading = Database['public']['Tables']['reading']['Row'];
