import { Observable } from "rxjs";


export abstract class AuthApi {
    abstract login(data: any): Observable<any>;
    abstract signup(data: any): Observable<any>;
    abstract forgotPassword(data: any): Observable<any>;
    abstract resetCode(data: any): Observable<any>;
    abstract resetPassword(data: any): Observable<any>;
}