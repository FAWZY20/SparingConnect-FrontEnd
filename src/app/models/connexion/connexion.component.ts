import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { NavigationService } from 'src/app/services/navigation-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  utilisateur: Utilisateur;
  constructor(
    private route: Router,
    private userService: UserService,
    private navigation: NavigationService
  ) { this.utilisateur = new Utilisateur() }

  toSubscribe(page: string) {
    this.navigation.moveNewPage(page)
  }

  onSubmit() {
    this.userService.login(this.utilisateur).subscribe(() => {
      this.route.navigate(['/admin']);
    })
  }

}
