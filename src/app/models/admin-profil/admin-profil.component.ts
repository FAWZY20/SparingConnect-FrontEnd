import { Component } from '@angular/core';
import { Profil } from 'src/app/dataModels/profil';
import { ProfilService } from 'src/app/services/profil.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.css']
})
export class AdminProfilComponent {
  profil: Profil;
  data: any;

  constructor(
    private userService: UserService,
    private profilService: ProfilService
  ){this.profil= new Profil()}

  
  onSubmit() {
    this.profil.userid = this.data.id;
    this.profilService.saveProfil(this.profil)
  }

  ngOnInit(){
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
      }
    });
  }

}
