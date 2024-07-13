import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sparingConnect';
  statut!: boolean;

  constructor(
    private userService: UserService
  ){

  }

  ngOnInit(){
    this.userService.authStatus$.subscribe(statut => {
      this.statut = statut;
      console.log(this.statut);
    });
  }


}
