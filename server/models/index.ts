import Patient from "./patient";

Patient.sync().catch((error) => console.log("error syncing patient: " + error));

export { Patient };
