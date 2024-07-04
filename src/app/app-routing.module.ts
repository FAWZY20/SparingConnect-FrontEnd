import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './models/home/home.component';
import { ConnexionComponent } from './models/connexion/connexion.component';
import { InscriptionComponent } from './models/inscription/inscription.component';
import { AdminComponent } from './models/admin/admin.component';
import { SucesseRegisterComponent } from './models/sucesse-register/sucesse-register.component';
import { AdminProfilComponent } from './models/admin-profil/admin-profil.component';
import { ProfilUpdateComponent } from './models/profil-update/profil-update.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "connexion", component: ConnexionComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "admin", component: AdminComponent },
  { path: "SucesseRegister", component: SucesseRegisterComponent },
  { path: "adminProfil", component: AdminProfilComponent },
  { path: "profilUpdate", component: ProfilUpdateComponent },
  { path: '**', redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
