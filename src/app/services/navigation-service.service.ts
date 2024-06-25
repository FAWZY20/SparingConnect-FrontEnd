import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private route: Router
  ) { }

  moveNewPage(page: string){
    this.route.navigate([page], {replaceUrl: true})
  }

}
