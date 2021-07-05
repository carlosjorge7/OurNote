import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Nota } from '../modelos/Nota';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private API = 'http://localhost:7777/api/notas';

  constructor(private http: HttpClient) { }

  getAllNotas(idUsuario: string) {
    let headers = new HttpHeaders();
    headers = headers.set('x-access-token', localStorage.getItem('token'));
    return this.http.get<Nota[]>(`${this.API}/${idUsuario}`, {headers});
  }

  createNota(nota: Nota) {
    let headers = new HttpHeaders();
    headers = headers.set('x-access-token', localStorage.getItem('token'));
    return this.http.post<Nota>(`${this.API}/`, nota, {headers});
  }

  deleteNota(idNota: string) {
    let headers = new HttpHeaders();
    headers = headers.set('x-access-token', localStorage.getItem('token'));
    return this.http.delete(`${this.API}/${idNota}`, {headers})
  }

  updateNota(nota: Nota) {
    let headers = new HttpHeaders();
    headers = headers.set('x-access-token', localStorage.getItem('token'));
    return this.http.put<Nota>(`${this.API}/${nota.idNota}`, nota, {headers})
  }

  deleteNotasByUser(idUsuario: string) {
    let headers = new HttpHeaders();
    headers = headers.set('x-access-token', localStorage.getItem('token'));
    return this.http.delete(`${this.API}/user/${idUsuario}`, {headers});
  }

}
