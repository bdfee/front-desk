import {
  Patient,
  PatientDetail,
  PatientProperties,
  AppointmentDetail,
  AppointmentProperties,
  Appointment,
  Specialist,
  SpecialistProperties,
  User,
  UserProperties,
  UserLogin,
} from "./types";

// specialist
export const isSpecialistInput = (object: unknown): object is Specialist => {
  if (typeof object !== "object" || object === null || "specialistId" in object) {
    return false;
  }
  const { name, speciality } = object as Specialist;
  return typeof name === "string" && typeof speciality === "string";
};

export const isSpecialist = (object: unknown): object is Specialist => {
  if (typeof object !== "object" || object === null) {
    return false;
  }
  const { specialistId, name, speciality } = object as Specialist;
  return typeof specialistId === "number" && typeof name === "string" && typeof speciality === "string";
};

export const validSpecialistProperties = (object: unknown): object is SpecialistProperties => {
  for (const key in object as SpecialistProperties) {
    if (!["specialistId", "name", "speciality"].includes(key)) {
      return false;
    }
  }
  return true;
};

// patient
export const isPatientInput = (object: unknown): object is Patient => {
  if (typeof object !== "object" || object === null || "patientId" in object) {
    return false;
  }
  const { name, email, phone, dateOfBirth, gender, address, specialistId } = object as Patient;
  return (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof phone === "string" &&
    typeof dateOfBirth === "string" &&
    typeof gender === "string" &&
    typeof address === "string" &&
    typeof specialistId === "number"
  );
};

export const isPatientDetail = (object: unknown): object is PatientDetail => {
  if (typeof object !== "object" || object === null) {
    return false;
  }

  const { name, email, phone, dateOfBirth, gender, address, specialist } = object as PatientDetail;
  const { name: specialistName } = specialist as { name: string };

  return (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof phone === "string" &&
    typeof dateOfBirth === "string" &&
    typeof gender === "string" &&
    typeof address === "string" &&
    typeof specialist === "object" &&
    typeof specialistName === "string"
  );
};

export const validPatientProperties = (object: unknown): object is PatientProperties => {
  for (const key in object as PatientProperties) {
    if (!["name", "email", "phone", "dateOfBirth", "gender", "address", "specialistId"].includes(key)) {
      return false;
    }
  }
  return true;
};

// appointment
export const isAppointmentInput = (object: unknown): object is Appointment => {
  if (typeof object !== "object" || object === null || "appointmentId" in object) {
    return false;
  }
  const { patientId, specialistId, date, start, end, type, description } = object as Appointment;

  return (
    typeof patientId === "number" &&
    typeof specialistId === "number" &&
    typeof date === "string" &&
    typeof start === "string" &&
    typeof end === "string" &&
    typeof type === "string" &&
    typeof description === "string"
  );
};

export const isAppointmentDetail = (object: unknown): object is AppointmentDetail => {
  if (typeof object !== "object" || object === null) {
    return false;
  }

  const { date, start, end, type, description, specialist, patient } = object as AppointmentDetail;
  const { name: specialistName } = specialist as { name: string };
  const { name: patientName } = patient as { name: string };

  return (
    typeof date === "string" &&
    typeof start === "string" &&
    typeof end === "string" &&
    typeof type === "string" &&
    typeof description === "string" &&
    typeof specialist === "object" &&
    typeof patient === "object" &&
    typeof specialistName === "string" &&
    typeof patientName === "string"
  );
};

export const validAppointmentProperties = (object: unknown): object is AppointmentProperties => {
  for (const key in object as AppointmentProperties) {
    if (!["patientId", "specialistId", "date", "start", "end", "type", "description"].includes(key)) {
      return false;
    }
  }
  return true;
};

export const isUserInput = (object: unknown): object is User => {
  if (typeof object !== "object" || object === null || "id" in object) {
    return false;
  }

  const { name, username, password } = object as User;

  return typeof name === "string" && typeof username === "string" && typeof password === "string";
};

export const validUserProperties = (object: unknown): object is UserProperties => {
  for (const key in object as UserProperties) {
    if (!["name", "username", "password"].includes(key)) {
      return false;
    }
  }
  return true;
};

export const isUserLogin = (object: unknown): object is UserLogin => {
  if (typeof object !== "object" || object === null) {
    return false;
  }

  const { username, password } = object as UserLogin;

  return typeof username === "string" && typeof password === "string";
};

export const isDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const parsedDate = Date.parse(date);
  return dateRegex.test(date) && !isNaN(parsedDate);
};

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};
