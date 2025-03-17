// befor adapt
export interface IloginApiRes {
  message: string;
  token: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
  };
}
// after adapt
export interface IloginRes {
  message: string;
  token: string;
  userEmail: string;
}
