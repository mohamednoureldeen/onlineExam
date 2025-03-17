import { Injectable } from '@angular/core';
import { Iadabtor } from '../interface/iadaptor';
import { IloginApiRes, IloginRes } from '../interface/iloginRes';
import { IsignupApiRes, IsignupRes } from '../interface/isignupRes';
import { IfogotPasswordRes } from '../interface/ifogot-passwordRes';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIAdaptorService implements Iadabtor{

  constructor() { }

  adaptLogin(data:IloginApiRes ):IloginRes  {
    return{
      message: data.message,
      token: data.token,
      userEmail: data.user.email
    }
  }
  adaptSignup(data:IsignupApiRes ):IsignupRes  {
    return{
      username: data.user.username,
      message: data.message,
      token: data.token,
      userEmail: data.user.email
    }
  }
  adaptForgotPassword(data:IfogotPasswordRes):IfogotPasswordRes  {
    return{
      message: data.message,
      info: data.info
    }
  }
  
}
