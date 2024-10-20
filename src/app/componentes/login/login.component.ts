import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import {LoginService} from "../../services/login.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  msjError: string = "";

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
  }

  login() {

    if (!this.email || !this.email.trim()) {
      this.msjError = "Ingrese email";
      this.showErrorAlert(this.msjError);
      return;
    } else if (!this.isValidEmail(this.email)) {
      this.msjError = "Email no válido";
      this.showErrorAlert(this.msjError);
      return;
    }

    if (!this.password || !this.password.trim()) {
      this.msjError = "Ingrese contraseña";
      this.showErrorAlert(this.msjError);
      return;
    }

    this.loginService.login(this.email, this.password)
      .then((result) => {
        if (result.success) {

          this.router.navigate(['/peliculas']);

        } else {
          this.showErrorAlert(result.message);
        }
      });
  }

  autoCompletar() {
    this.email = 'admin@gmail.com';
    this.password = 'Admin2024';
  }

  private showErrorAlert(message: string) {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }

  private showSuccessAlert(message: string) {
    return Swal.fire({
      title: 'Login exisoto!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

}
