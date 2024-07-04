import { Component } from '@angular/core';
import { Profil } from 'src/app/dataModels/profil';
import { ProfilService } from 'src/app/services/profil.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil-update',
  templateUrl: './profil-update.component.html',
  styleUrls: ['./profil-update.component.css']
})
export class ProfilUpdateComponent {
  profil: Profil;
  data: any;

  constructor(
    private userService: UserService,
    private profilService: ProfilService
  ){this.profil= new Profil()}

  
  onSubmit() {
    this.profil.userid = this.data.id;
    this.profilService.updateProfil(this.profil.userid, this.profil)
  }

  ngOnInit(){
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
      }
    });
  }
}
