import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { ImageService } from 'src/app/services/image.service';
import { ProfilService } from 'src/app/services/profil.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  data: any;
  utilsiateur: Utilisateur;
  urlImage: any = {};


  constructor(
    private userService: UserService,
    private profilService: ProfilService,
    private imageService: ImageService
  ){
    this.utilsiateur = new Utilisateur()
  }

  disconnect() {
    this.userService.disconnect()
  }

  ngOnInit(){
    this.userService.decodeToken().subscribe(async decodedData => {
      if (decodedData == null) {
        console.error("l'utilisateur n'existe pas");
      }
        this.utilsiateur = await decodedData
        this.urlImage[this.utilsiateur.id] = await this.imageService.getImageProfil(this.utilsiateur.id);
    });
  }
  
}
