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
  utilsiateur: Utilisateur
  profil$: Observable<Boolean> = of(false);
  isProfil: Boolean = false;

  constructor(
    private userService: UserService,
    private profilService: ProfilService,
    private navigation: NavigationService
  ){this.utilsiateur = new Utilisateur()}

  toRegisterProfil(page: string) {
    this.navigation.moveNewPage(page)
  }


  ngOnInit(){
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.utilsiateur = decodedData
        if (this.utilsiateur.id != null) {
          this.profilService.checkProfil(this.utilsiateur.id).subscribe(res => {
            this.isProfil = res;
          })
        }else{
          console.log("l'id n'existe pas");
        }
      }
    });
    
  }

}
