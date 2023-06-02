import { Appointment, AppointmentDetail, AppointmentProperties } from "../../types";
import { isAppointmentDetail, isAppointmentInput, validAppointmentProperties } from "../../typeUtils";

export const validateProperties = (object: unknown): object is AppointmentProperties => {
  if (!validAppointmentProperties(object)) {
    throw new Error("invalid property on appointment input");
  }
  return true;
};

export const validateInput = (object: unknown): object is Appointment => {
  if (!isAppointmentInput(object)) {
    throw new Error("malformed or invalid value on appointment input");
  }
  return true;
};

export const validateDetail = (object: unknown): object is AppointmentDetail => {
  if (!isAppointmentDetail(object)) {
    throw new Error("malformed or invalid value on appointment");
  }
  return true;
};
