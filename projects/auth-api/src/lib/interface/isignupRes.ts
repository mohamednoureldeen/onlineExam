// befor adapt
export interface IsignupApiRes {
  message: string;
  token: string;
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    _id: string;
    createdAt: string;
  };
}
// after adapt
export interface IsignupRes {
  username: string;
  message: string;
  token: string;
  userEmail: string;
}
