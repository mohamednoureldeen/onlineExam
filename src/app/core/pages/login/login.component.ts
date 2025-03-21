import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthApiService } from 'auth-api';
import { IauthTokenState } from '../../layout/auth-layout/store/auth.model';
import { loginSuccess } from '../../layout/auth-layout/store/auth.actions';
import { map, Observable } from 'rxjs';
import { selectAuthToken } from '../../layout/auth-layout/store/auth.selectors';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // token$: Observable<string | null>;
  
  isLoading : boolean = false;
  private readonly formbulder = inject(FormBuilder);
  private readonly router = inject(Router)
  constructor(
    private authApiService:AuthApiService,
    private store :Store<{auth: IauthTokenState}>,
  ){
    // {this.token$ = this.store.select(selectAuthToken).pipe(map((state: IauthState) => state.token))};
  }

  loginForm:FormGroup = this.formbulder.group({
    email: [null,[Validators.required,Validators.email]],
    password: [null,[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]],
  })

  login():void{
    this.isLoading = true
    if(this.loginForm.valid){
      this.authApiService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        if(res.message === 'success'){
          setTimeout(( ) => {
            this.store.dispatch(loginSuccess({token: res.token}));
            // this.token$.subscribe(token => console.log('Token from Store:', token));
            localStorage.setItem('userToken', res.token);
            this.router.navigate(['/']);
          },  500);
          this.isLoading = false
        }
      },
      error:(err)=>{
        this.isLoading = false;
        console.log(err);
      }
    })
    }
  }
  }


