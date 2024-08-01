import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Images } from '../dataModels/images';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  usersUrl: String = "";

  constructor(
    private http: HttpClient,
  ) { 
    this.usersUrl = "http://localhost:8085/gestionUtilisateur/images/"
  }

  addImage(image: Images): Observable<any>{
    return this.http.post<Images>(this.usersUrl + "addImage", image)
  }


  getimagesByUserId(userId: string): Observable<any>{
    return this.http.get<Images>(this.usersUrl + `getImage/${userId}`)
  }

  getImageProfil(userid: string): Observable<Blob> {
    return this.http.get(this.usersUrl + `getImageProfil/${userid}`, { responseType: 'blob' })
  }

}
