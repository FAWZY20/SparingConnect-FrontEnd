import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { defaultIfEmpty, filter, first, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Images } from 'src/app/dataModels/images';
import { Profil } from 'src/app/dataModels/profil';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { ImageService } from 'src/app/services/image.service';
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
  imageUrl: string | null = null;


  constructor(
    private userService: UserService,
    private profilService: ProfilService,
    private imageService: ImageService,
    private navigation: NavigationService,
    private route: Router
  ) {
    this.utilsiateur = new Utilisateur()
  }

  toRegisterProfil(page: string) {
    this.navigation.moveNewPage(page)
  }

  getProfil(userId: string) {
    this.profilService.getProfil(userId).subscribe((res) => {
      console.log(res.sport);
    })
  }

  goToProfil(userId: string) {
    this.route.navigate(['/admin/publicProfil', userId])
  }

  getProfilImages(userId: string) {
    this.imageService.getimagesByUserId(userId).pipe(
      filter(images => images.profilImg == true)
    ).subscribe(data => {
      if (data) {
        this.imageUrl = `data:${data.type};base64,${data.images}`;
        console.log("l'url de l'image" + this.imageUrl);
      } else {
        this.imageUrl = null;
      }
    });
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
