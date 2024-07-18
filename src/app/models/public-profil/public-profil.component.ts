import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profil } from 'src/app/dataModels/profil';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { ProfilService } from 'src/app/services/profil.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-public-profil',
  templateUrl: './public-profil.component.html',
  styleUrls: ['./public-profil.component.css']
})
export class PublicProfilComponent implements OnInit {
  userId: any = "";
  utilisateur: Utilisateur;
  profil: Profil;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private profilService: ProfilService
  ) {
    this.utilisateur = new Utilisateur()
    this.profil = new Profil()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.userService.getUserById(this.userId).subscribe((res) => {
        this.utilisateur = res;
        this.profilService.getProfil(this.utilisateur.id).subscribe((resp) => {
          this.profil = resp
        })
      })
    });
  }

}
