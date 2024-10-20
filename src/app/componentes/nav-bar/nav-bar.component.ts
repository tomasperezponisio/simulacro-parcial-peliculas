import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {Auth, signOut} from "@angular/fire/auth";
import {NgIf} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(
    private router: Router,
    public auth: Auth
  ) {
  }

  closeSession(){
    signOut(this.auth).then(() => {
      this.showErrorAlert("Logueate para acceder a los juegos").then(() => {
        this.router.navigate(['/peliculas']);
      });
    })
  }

  private showErrorAlert(message: string) {
    return Swal.fire({
      title: 'Cerraste sesión!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }

}
