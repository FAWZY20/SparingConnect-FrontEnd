import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sparingConnect';
  isStatut!: Boolean;

  constructor(
    private userService: UserService
  ){}

  ngOnInit(){
    console.log(this.userService.getStatut());
  }

}
