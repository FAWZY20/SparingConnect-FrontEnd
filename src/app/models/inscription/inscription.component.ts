import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { NavigationService } from 'src/app/services/navigation-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  utilisateur: Utilisateur;

  constructor(
    private navigation: NavigationService,
    private userService: UserService
  ) { this.utilisateur = new Utilisateur() }


  toConnect(arg0: string) {
    this.navigation.moveNewPage(arg0)
  }

  onSubmit() {
    this.userService.addUser(this.utilisateur);
  }
}
