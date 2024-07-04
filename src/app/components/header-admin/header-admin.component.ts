import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {

  constructor(
    private route: Router
  ){

  }

  Disconnect() {
    localStorage.clear()
    this.route.navigate(['home'])
  }

}
