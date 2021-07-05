import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuariosService } from './servicios/usuarios.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuariosService, private router: Router){}

  canActivate(): boolean {
    if(this.usuarioService.estaLoggeado()){
      return true
    }
    this.router.navigate(['/usuarios']);
    return false;
  }
  
}
