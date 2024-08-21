import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../dataModels/utilisateur';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { ProfilService } from './profil.service';
import { ImageService } from './image.service';
import { Images } from '../dataModels/images';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl: String = "";
  statut: Boolean = false;
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatus.asObservable();
  image: Images;
  imageFile!: File;

  constructor(
    private http: HttpClient,
    private profilService: ProfilService,
    private imageService: ImageService,
    private route: Router,
  ) {
    this.image = new Images();
    this.usersUrl = 'http://localhost:8085/gestionUtilisateur';
  }


  private hasToken(): boolean {
    return !!localStorage.getItem('userAuth');
  }

  public checkAuth() {
    this.authStatus.next(this.hasToken());
  }

  public getAllUser(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.usersUrl + '/getAllUser')
  }

  public getUser(utilisateur: Utilisateur) {
    this.http.get<Utilisateur>(this.usersUrl + '/getUser/' + utilisateur.id)
  }

  public getUserById(userId: String): Observable<any> {
    return this.http.get<Utilisateur>(this.usersUrl + '/getUser/' + userId)
  }

  public getUserByMail(mail: String): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.usersUrl + `/usersByMail/${mail}`);
  }


  public addUser(utilisateur: Utilisateur) {
    const imageUrl = '../../assets/images/user.jpg';
    
    this.http.post<Utilisateur>(this.usersUrl + '/addUser', utilisateur).subscribe((res) => {
      this.http.get(imageUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
        this.imageFile = new File([blob], 'user.jpg', { type: blob.type });
        
        this.imageService.addImage(res.id, true, this.imageFile).subscribe(() =>
          this.route.navigate(["connexion"])
        )
      
      });
    })
  }

  public updateUser(id: string, utilisateur: Utilisateur): Observable<any> {
    return this.http.put<Utilisateur>(this.usersUrl + `/updateUser/${id}`, utilisateur)
  }

  updatePwd(id: string, utilisateur: Utilisateur) {
    this.http.put<Utilisateur>(this.usersUrl + `/updatePwd/${id}`, utilisateur).subscribe(() => {
      this.route.navigate(['/admin/edit/security']);
    })
  }

  public deleteUser(id: string) {
    return this.http.delete<Utilisateur>(this.usersUrl + `/deleteUser/${id}`).subscribe(() => {
      this.profilService.deleteProfil(id).subscribe(() => {
        this.route.navigate(["/"])
        localStorage.clear()
      })
    })
  }

  public login(utilisateur: Utilisateur) {
    return this.http.post<Utilisateur>(this.usersUrl + '/login', utilisateur).pipe(
      map((response: any) => {
        localStorage.setItem('userAuth', JSON.stringify(response));
        return response;
      })).subscribe((res) => {
        if (res != null) {
          this.route.navigate(['/admin']);
          this.authStatus.next(true);
        } else {
          localStorage.clear()
          this.route.navigate(['connexion']);
        }
      });
  }

  public disconnect() {
    localStorage.clear()
    this.route.navigate(['home'])
    this.authStatus.next(false)
  }

  public decodeToken(): Observable<any> {
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
