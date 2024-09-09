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

export interface IUser {

}

export interface dataUserStatus {
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
