import { Task, TaskDetail, TaskProperties } from "../../types";
import { isTaskDetail, isTaskInput, validTaskProperties, isDate } from "../../typeUtils";

export const validateProperties = (object: unknown): object is TaskProperties => {
  if (!validTaskProperties(object)) {
    throw new Error("invalid property on task");
  }
  return true;
};

export const validateInput = (object: unknown): object is Task => {
  if (!isTaskInput(object)) {
    throw new Error("malformed or invalid value on task input");
  }
  return true;
};

export const validateDetail = (object: unknown): object is TaskDetail => {
  if (!isTaskDetail(object)) {
    throw new Error("malformed or invalid value on task");
  }
  return true;
};

export const validateDateframe = (start: string, end: string) => {
  if (!isDate(start) || !isDate(end) || !start || !end) {
    throw new Error("invalid date on dateframe");
  }

  if (new Date(start) > new Date(end)) {
    throw new Error("start date must come before end date");
  }
  return true;
};
