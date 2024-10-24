import { Moment } from "moment"

export interface Users {
  id: number;
  identificationType: string;
  numberIdentification: number;
  firstName: string,
  secondName: string,
  firstSurname: string,
  secondSurname:string,
  email: string,
  password: string,
  confirmPassword: string,
  firstLogin: boolean,
  documentId: string,
  employeeId: string,
  rol: string,
  role: string,
}

export interface LoggedUser {
  id: number;
  identificationType: string;
  numberIdentification: number;
  firstName: string,
  secondName: string,
  firstSurname: string,
  secondSurname:string,
  email: string,
  password: string,
  confirmPassword: string,
  firstLogin: boolean,
  documentId: string,
  employeeId: string,
  rol: string,
  role: string,
}

export interface ILogginUser {
  email: string,
  password: string
}

export interface IDataApplicantStatus {
  identificationNumber: number,
  fullName: string,
  inscriptionDate: string,
  academicProgram: string,
  status: string,
  pymentStatus?: string,
  docsStatus?: string,
  interviewStatus?: string,
  testStatus?: string,
}

export interface IApplicant {
  index: number,
  profilePhoto: string,
  fullName: string,
  identificationNumber: number,
  birthdate?: string,
  status: string,
  result: string,
  phone: number,
  mobile: number,
  email: string,
}

export interface IReviwer {
  id: number,
  firstName: string,
  secondName: string,
  firstLastName: string,
  secondLastName: string,
  email: string,
  dateBirth: string,
  phone: number,
  faculty: string,
  programName: string
}
