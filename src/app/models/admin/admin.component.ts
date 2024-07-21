import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Profil } from 'src/app/dataModels/profil';
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
  allUtilisateur: Utilisateur[] = [];
  allProfil: Profil[] = [];
  profil$: Observable<Boolean> = of(false);
  isProfil: Boolean = false;

  constructor(
    private userService: UserService,
    private profilService: ProfilService,
    private navigation: NavigationService
  ) { this.utilsiateur = new Utilisateur() }

  toRegisterProfil(page: string) {
    this.navigation.moveNewPage(page)
  }

  getProfil(userId: string) {
    this.profilService.getProfil(userId).subscribe((res) => {
      console.log(res.sport);
    })
  }
  ngOnInit() {

    this.userService.getAllUser().pipe(
      map(users => users.slice(0, 10)),
      switchMap(users => {
        const profileObservables = users.map(user =>
          this.profilService.getProfil(user.id).pipe(
            map(profile => ({
              ...user,
              profile // Ajouter le profil à l'utilisateur
            }))
          )
        );
        return forkJoin(profileObservables);
      })
    ).subscribe(usersWithProfiles => {
      this.allUtilisateur = usersWithProfiles;
      console.log(this.allUtilisateur.map(user => console.log(user.profile?.sport))); // Vérifiez la structure des données ici
    });

    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.utilsiateur = decodedData
        if (this.utilsiateur.id != null) {
          this.profilService.checkProfil(this.utilsiateur.id).subscribe(res => {
            this.isProfil = res;
          })
        } else {
          console.log("l'id n'existe pas");
        }
      }
    });

  }

}
