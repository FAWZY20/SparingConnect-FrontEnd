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
  dateNaissance!: Date;
  erreurInscription: boolean = false;
  validInscription: boolean = false;
  confirmPwd: string = "";


  constructor(
    private navigation: NavigationService,
    private userService: UserService
  ) { 
    this.utilisateur = new Utilisateur()
    this.dateNaissance = new Date()
  }

  ageCalculator(date: Date): number {
    const dateObject = new Date(date);
    const dateNow = new Date();
    return dateNow.getFullYear() - dateObject.getFullYear()
  }

  toConnect(arg0: string) {
    this.navigation.moveNewPage(arg0)
  }

  onSubmit() {
    if (this.dateNaissance 
      && this.utilisateur.prenom != ""
      && this.utilisateur.nom != ""
      && this.utilisateur.mail != "") {

      this.utilisateur.age = this.ageCalculator(this.dateNaissance);

      if (this.utilisateur.age >= 18 && this.utilisateur.password == this.confirmPwd) {
        this.userService.addUser(this.utilisateur);
        this.validInscription = true;
      } else {
        this.erreurInscription = true
      }

    } else {
      this.erreurInscription = true
    }
  }
}
