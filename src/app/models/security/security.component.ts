import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent {
  utilisateur: Utilisateur;
  data: any
  newPwd: string = "";
  pwd: string = "";
  errorPwd: boolean = false;
  validPwd: boolean = false;

  constructor(
    private userService: UserService
  ) { this.utilisateur = new Utilisateur() }

  checkPwd(): Boolean {
    return this.data.password == this.pwd 
    && this.data.password != this.newPwd
    && this.utilisateur.password == this.newPwd
    && this.pwd != ""
    && this.newPwd != ""
    && this.utilisateur.password != "";
  }

  checkSizePwd(pwd: string): boolean{
    if (pwd.length >= 8) {
      return true
    } else {
      return false
    }
  }

  onSubmit() {
    if (this.checkPwd() && this.checkSizePwd(this.newPwd)) {
      this.userService.updatePwd(this.data.id, this.utilisateur)
      this.validPwd = true
    } else{
      this.errorPwd = true
    }
  }

  ngOnInit() {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.data = decodedData
      }
    });
  }

}
