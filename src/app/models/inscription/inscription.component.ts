import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation-service.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  
  constructor(
    private navigation: NavigationService
  ){}
  
  
  toConnect(arg0: string) {
    this.navigation.moveNewPage(arg0)
  }

}
