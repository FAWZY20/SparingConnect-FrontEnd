import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../dataModels/utilisateur';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl: String = "";


  constructor(
    private http: HttpClient,
    private route: Router,
  ) {
    this.usersUrl = 'http://localhost:8085/gestionUtilisateur';
  }


  public getUser(utilisateur: Utilisateur){
    this.http.get<Utilisateur>(this.usersUrl + '/getUser/' + utilisateur.id)
  }

  public getUserByMail(mail: String): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.usersUrl + `/usersByMail/${mail}`);
  }


  public addUser(utilisateur: Utilisateur){
    this.http.post<Utilisateur>(this.usersUrl + '/addUser', utilisateur).subscribe(() =>{
        console.log("profil ajouter");
    })
  }

  public updateUser(id: string ,utilisateur: Utilisateur){
    this.http.put<Utilisateur>(this.usersUrl + `/updateUser/${id}`, utilisateur).subscribe(() =>{
      this.route.navigate(['/edit/account']);
    })
  }


  public login(utilisateur: Utilisateur) {
    return this.http.post<Utilisateur>(this.usersUrl + '/login', utilisateur).pipe(
      map((response: any) => {
        localStorage.setItem('userAuth', JSON.stringify(response));
        return response;
      }));
  }


  public decodeToken(): Observable<any>{
    let token: any = localStorage.getItem('userAuth');
    if (token) {
      let decodedToken: any = jwt_decode.jwtDecode(token);
      return this.getUserByMail(decodedToken.sub);
    } else {
      console.error('Token non trouvé dans le local storage.');
      return new Observable();
    }
  }
}
