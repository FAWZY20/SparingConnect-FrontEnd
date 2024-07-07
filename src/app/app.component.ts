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
  statut: Boolean = false

  ngOnInit(){
    if (localStorage.getItem("userAuth")) {
      this.statut = true
    }
  }
}
