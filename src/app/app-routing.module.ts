import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './models/home/home.component';
import { ConnexionComponent } from './models/connexion/connexion.component';
import { InscriptionComponent } from './models/inscription/inscription.component';
import { AdminComponent } from './models/admin/admin.component';
import { SucesseRegisterComponent } from './models/sucesse-register/sucesse-register.component';
import { AdminProfilComponent } from './models/admin-profil/admin-profil.component';
import { ProfilUpdateComponent } from './models/profil-update/profil-update.component';
import { AdminPage} from '../app/services/admin-page.service';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "connexion", component: ConnexionComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "SucesseRegister", component: SucesseRegisterComponent },
  { path: "admin", component: AdminComponent, canActivate: [AdminPage] },
  { path: "adminProfil", component: AdminProfilComponent, canActivate: [AdminPage] },
  { path: "profilUpdate", component: ProfilUpdateComponent, canActivate: [AdminPage] },
  { path: '**', redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
