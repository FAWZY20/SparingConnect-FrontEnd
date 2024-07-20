import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
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
  profil$: Observable<Boolean> = of(false);
  isProfil: Boolean = false;
  @ViewChildren('sportDiv') sportDivs!: QueryList<ElementRef>;

  constructor(
    private userService: UserService,
    private profilService: ProfilService,
    private navigation: NavigationService
  ) { this.utilsiateur = new Utilisateur() }

  toRegisterProfil(page: string) {
    this.navigation.moveNewPage(page)
  }


  ngAfterViewInit(): void {
    this.sportDivs.forEach(sportDiv => {
      const sport = sportDiv.nativeElement.getAttribute('data-sport');
      console.log(sport);
      this.getuserbySport(sport);
    });
  }


  getuserbySport(sport: string) {
    this.userService.getAllUser().pipe(
      switchMap(users => 
        forkJoin(users.map(user => 
          this.profilService.getProfil(user.id).pipe(
            map(profil => ({ user, profil }))
          )
        ))
      ),
      map(userProfiles => 
        userProfiles
          .filter(up => up.profil && up.profil.sport === sport)  // Vérification ajoutée ici
          .map(up => up.user)
      )
    ).subscribe(filteredUsers => {
      this.allUtilisateur = filteredUsers;
    });
  }

ngOnInit(){
  this.getuserbySport("Thailandaise");
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
