import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from 'auth-api';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  isLoading : boolean = false;
  private readonly formbulder = inject(FormBuilder);
  private readonly rotter = inject(Router)
  constructor(private authApiService:AuthApiService){}


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
            localStorage.setItem('userToken', res.token);
            this.rotter.navigate(['/']);
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


