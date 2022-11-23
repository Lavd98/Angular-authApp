import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup =  this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  registrar() {
    const {name, email, password} = this.registroForm.value;
    this.authService.registroUsuario(name, email, password).subscribe(data => {
      if(data === true) {
        this.router.navigateByUrl('/dashboard')
      } else {
        //TODO: mostrar mensaje de error
        Swal.fire({
          title: 'Error',
          text: data,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    })


    // 
  }

}
