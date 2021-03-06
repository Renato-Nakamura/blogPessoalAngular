import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {  }

  temUser(){
    let userSalvo = localStorage.getItem('user')
    if(userSalvo!= null){
      let user = JSON.parse(userSalvo)
      environment.foto =user.foto
      environment.nome = user.nome
      environment.token = user.token

      environment.id = user.id
    }
  }
  
  token ={
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }


  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(`${environment.uri}/usuario/login`,userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>(`${environment.uri}/usuario`,user)
  }

  getById(id:number):Observable<User>{
    return this.http.get<User>(`${environment.uri}/usuario/${id}`,this.token)
  }

  logado(){
    let ok = false

    if(environment.token != ''){
      ok = true
    }
    return ok
  }
}
