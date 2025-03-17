import { AuthApiService } from 'auth-api';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isLoading:boolean=false;
  successMsg:string='';



  private readonly formBuilder=inject(FormBuilder);
  private readonly rotter = inject(Router);
  constructor(private authApiService:AuthApiService){}

  registerForm: FormGroup = this.formBuilder.group({
    firstName: [null, [Validators.required,  Validators.minLength(3), Validators.maxLength(20)]],
    lastName: [null, [Validators.required,  Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]],
    rePassword: [null, [Validators.required]],
    phone: [null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, { validators: this.cofirmPassword });

  cofirmPassword(group: AbstractControl){
    let password = group.get('password')?.value;
    let rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : {mismatch:true}
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading=true;
      const formData = {
        ...this.registerForm.value,
        username: `${this.registerForm.value.firstName}.${this.registerForm.value.lastName}`.toLowerCase()
      };
      console.log(formData);
      this.authApiService.signup(formData).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            setTimeout(( ) => {
              this.rotter.navigate(['/login']);
            },  500);

          this.successMsg = res.message;
        }
        this.isLoading=false;
      },
        error:(err)=>{
          console.log(err);
         
        }
      })
    }
  }

}

