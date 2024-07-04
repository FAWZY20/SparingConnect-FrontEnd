import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Profil } from '../dataModels/profil';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  usersUrl: String = "";


  constructor(
    private http: HttpClient,
    private route: Router,
  ) {
    this.usersUrl = 'http://localhost:8085/gestionProfil';
  }

  public saveProfil(profil: Profil) {
    this.http.post<Profil>(this.usersUrl + `/saveProfil/${profil.userid}`, profil).subscribe(() => {
      console.log("profil bien enregistrer");
    });
  }

  public updateProfil(userid: string, profil: Profil) {
    this.http.put<Profil>(this.usersUrl + `/editProfil/${userid}`, profil).subscribe(() => {
      console.log("profil mise a jour");
    })
  }

  public checkProfil(id: string): Observable<boolean> {
    return this.http.get<Profil>(this.usersUrl + `/getProfil/${id}`).pipe(
      map(res => res != null),
      catchError(error => {
        console.error(error);
        return of(false);
      })
    );
   }

}
