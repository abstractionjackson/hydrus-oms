// a list of patients
import type { Patient } from '$types/index'
const DEFAULT_ID: number = 1
const DEFAULT_CASE_DATE: string = "2020-06-01" // random
const DEFAULT_NAME_FIRST: string = "John"
const DEFAULT_NAME_LAST: string = "Doe"
const DEFAULT_DOB: string = "1995-03-04"
const DEFAULT_OD_OS: Patient['od_os'] = ["OD", "OS"]
const DEFAULT_USER: Patient['user'] = "1"
const DEFAULT_PATIENT: Patient = {
    id: DEFAULT_ID,
    case_date: DEFAULT_CASE_DATE,
    name_first: DEFAULT_NAME_FIRST,
    name_last: DEFAULT_NAME_LAST,
    dob: DEFAULT_DOB,
    od_os: DEFAULT_OD_OS,
    user: DEFAULT_USER
};
export const patients: Patient[] = [
    DEFAULT_PATIENT
];