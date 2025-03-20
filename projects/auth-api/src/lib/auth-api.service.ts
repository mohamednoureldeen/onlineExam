import { AuthAPIAdaptorService } from './adaptor/auth-api.adaptor.service';
import { Inject, Injectable } from '@angular/core';
import { AuthApi } from './base/authApi';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthApiEndpoints } from './enums/authApi.endpoints';
import { IloginData } from './interface/iloginData';
import { IloginRes } from './interface/iloginRes';
import { BASE_URL } from './base-url.token';
import { IsignupData } from './interface/isignupData';
import { IsignupRes } from './interface/isignupRes';
import { IcodeData, IfogotPasswordData, IresetPasswordData } from './interface/ifogot-passwordData';
import { IcodeRes, IfogotPasswordRes, IresetPasswordRes } from './interface/ifogot-passwordRes';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthApi {

  constructor(private httpClient: HttpClient,
    private authAPIAdaptorService: AuthAPIAdaptorService,
     @Inject(BASE_URL) private baseUrl: string
  ) { }

    private getUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  login(data: IloginData): Observable<IloginRes> {
    // const url = `${this.baseUrl}${AuthApiEndpoints.LOGIN}`;
    return this.httpClient.post(this.getUrl(AuthApiEndpoints.LOGIN), data).pipe(
      map((res: any) => this.authAPIAdaptorService.adaptLogin(res)),
      catchError((err: any) => of(err))
    );
  }
  signup(data: IsignupData): Observable<IsignupRes> {
    // const url = `${this.baseUrl}${AuthApiEndpoints.SIGNUP}`;
    return this.httpClient.post(this.getUrl(AuthApiEndpoints.SIGNUP), data).pipe(
      map((res: any) => this.authAPIAdaptorService.adaptSignup(res)),
      catchError((err: any) => of(err))
    );
  }
  forgotPassword(data:IfogotPasswordData):Observable<IfogotPasswordRes>{
    // const url = `${this.baseUrl}${AuthApiEndpoints.FORGOT_PASSWORD}`;
    return this.httpClient.post(this.getUrl(AuthApiEndpoints.FORGOT_PASSWORD), data).pipe(
      map((res: any) => this.authAPIAdaptorService.adaptForgotPassword(res)),
      catchError((err: any) => of(err))
    );
  }
   resetCode(data: IcodeData): Observable<IcodeRes> {
    const url = `${this.baseUrl}${AuthApiEndpoints.VERIFY_CODE}`;
    return this.httpClient.post(url, data).pipe(
      map((res: any) => res),
      catchError((err: any) => of(err))
    );
  }

  resetPassword(data: IresetPasswordData): Observable<IresetPasswordRes> {
    // const url = `${this.baseUrl}${AuthApiEndpoints.RESET_PASSWORD}`;
    return this.httpClient.put(this.getUrl(AuthApiEndpoints.RESET_PASSWORD), data).pipe(
      map((res: any) => res),
      catchError((err: any) => of(err))
    );
  }




}

