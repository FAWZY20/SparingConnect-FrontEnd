import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { ProfilService } from 'src/app/services/profil.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  utilisateur: Utilisateur

  constructor(
    private userService: UserService,
    private profilService: ProfilService,
    private route: Router
  ) { this.utilisateur = new Utilisateur() }

  onSubmit() {
    this.userService.updateUser(this.utilisateur.id, this.utilisateur)
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(this.utilisateur.id)
  }

  ngOnInit() {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.utilisateur = decodedData
      }
    });
  }

}
