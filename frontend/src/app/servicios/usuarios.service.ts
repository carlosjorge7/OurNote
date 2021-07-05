import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private API = 'http://localhost:7777/api/usuarios';

  constructor(private http: HttpClient) { }

  login(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.API}/login`, usuario);
  }

  registro(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.API}/registro`, usuario);
  }

  getUsuario(idUsuario: string) {
    let headers = new HttpHeaders();
    headers = headers.set('x-access-token', localStorage.getItem('token')); // HttpHeaders angular x-access-token
    return this.http.get<Usuario>(`${this.API}/${idUsuario}`, {headers});
  }

  estaLoggeado(): Boolean{
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
  }

  deleteUsuario(idUsuario: string) {
    let headers = new HttpHeaders();
    headers = headers.set('x-access-token', localStorage.getItem('token'));
    return this.http.delete<Usuario>(`${this.API}/${idUsuario}`, {headers});
  }

  
}
