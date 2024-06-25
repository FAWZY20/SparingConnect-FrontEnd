import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './models/home/home.component';
import { ConnexionComponent } from './models/connexion/connexion.component';
import { InscriptionComponent } from './models/inscription/inscription.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"connexion", component: ConnexionComponent},
  {path:"inscription", component: InscriptionComponent},
  { path: '**', redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
