import { Component } from '@angular/core';
import { Profil } from 'src/app/dataModels/profil';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { ProfilService } from 'src/app/services/profil.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  utilisateur: Utilisateur;
  profil: Profil;
  checkDescription: boolean = false;
  description: string = "";

  constructor(
    private userService: UserService,
    private profilServie: ProfilService
  ) { 
    this.utilisateur = new Utilisateur() 
    this.profil = new Profil()
  }


  descriptionForm() {
    if (this.checkDescription) {
      this.checkDescription = false;
    } else {
      this.checkDescription = true;
    }
  }

  onSubmit() {
    this.utilisateur.description = this.description;
    this.userService.updateUser(this.utilisateur.id ,this.utilisateur).subscribe(() => {
      this.checkDescription = false;
    })
  }

  ngOnInit() {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.utilisateur = decodedData
        this.profilServie.getProfil(this.utilisateur.id).subscribe((res) => {
          this.profil = res
        })
      }
    });
  }

}
