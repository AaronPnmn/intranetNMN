import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  miFormulario: FormGroup = this.fb.group({
    email:     ['miguel@nmn.mx',[ Validators.required, Validators.email ]],
    password:  ['nmn466mx',[ Validators.required, Validators.minLength(6) ]],
    
  });

  

  constructor( private fb:FormBuilder,
               private router: Router,
               private authService: AuthService,
               private snackBar: MatSnackBar, ) { }

  login(){

    
    console.log(this.miFormulario.value);
    const { email, password } = this.miFormulario.value;
    this.authService.login( email, password )
      .subscribe( ok => {

        
        

        if ( ok.ok === true ) {
          this.router.navigateByUrl('/actividades');
          const snackBarRef = this.snackBar.dismiss()
        }else{
          const message = ok.error.error;
          const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
          

          if ( ok.error.error === "USER_NOT_EXISTS"){
            this.miFormulario.patchValue({email: ''});
          }
          if ( ok.error.error === "PASSWORD_INVALID"){
            this.miFormulario.patchValue({password: ''});
          }
          
        }
      });
    
  }
  
  

}
