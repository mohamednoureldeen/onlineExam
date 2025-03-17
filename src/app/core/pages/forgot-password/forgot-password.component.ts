import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from 'auth-api';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  step:number = 1;

  constructor(private authApiService:AuthApiService){}

  // step 1
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  
// step 2
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  })

// step 3
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]),
  })

  verifyEmailSubmit(): void {
console.log(this.verifyEmail.value);
    this.authApiService.forgotPassword(this.verifyEmail.value).subscribe({
      next:(res)=>{
        if(res.message === 'success'){
          this.step = 2;
        }
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  verifyCodeSubmit(): void {
    let emailValue = this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue);
    this.authApiService.resetCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        if(res.status === 'Success'){
          this.step = 3;
        }
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

  resetPasswordSubmit(): void {
    console.log(this.resetPassword.value);
    this.authApiService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        if(res.message === 'success'){
        console.log(res);
        }
      },
      error:(err)=>{
        console.log(err);
      }
  })
  }




}
