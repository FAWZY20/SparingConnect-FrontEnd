import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  data:any;
  utilisateur: Utilisateur

  constructor(
    private userService: UserService,
  ){this.utilisateur = new Utilisateur()}

  onSubmit() {
    console.log(this.utilisateur);
    this.userService.updateUser(this.utilisateur.id, this.utilisateur)
  }

  ngOnInit(){
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.utilisateur = decodedData
      }
    });
  }

}