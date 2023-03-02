create view "case" as
  SELECT patient.*, operation.date as operation_date, reading.psi, reading.date as reading_date 
  FROM patient
  JOIN operation ON patient.id = operation.patient_id
  JOIN reading ON patient.id = reading.patient_id;
