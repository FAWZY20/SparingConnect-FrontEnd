import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation-service.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  constructor(
    private navigation: NavigationService
  ){}

  toSubscribe(page: string) {
    this.navigation.moveNewPage(page)
  }

}
