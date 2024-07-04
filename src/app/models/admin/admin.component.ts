import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { NavigationService } from 'src/app/services/navigation-service.service';
import { ProfilService } from 'src/app/services/profil.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  utilisateur: Utilisateur
  data: any
  profil!: Observable<boolean>;

  constructor(
    private userService: UserService,
    private profilSerice: ProfilService,
    private navigation: NavigationService
  ){
    this.utilisateur = new Utilisateur();
  }

  toRegisterProfil(page: string) {
    this.navigation.moveNewPage(page)
  }

  ngOnInit(){
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
      }
    });
    this.profil = this.profilSerice.checkProfil(this.data?.id);
  }

}
