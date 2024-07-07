import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './models/home/home.component';
import { ConnexionComponent } from './models/connexion/connexion.component';
import { InscriptionComponent } from './models/inscription/inscription.component';
import { AdminComponent } from './models/admin/admin.component';
import { SucesseRegisterComponent } from './models/sucesse-register/sucesse-register.component';
import { AdminProfilComponent } from './models/admin-profil/admin-profil.component';
import { ProfilUpdateComponent } from './models/profil-update/profil-update.component';
import { AdminPage, AdminPageBloqued } from '../app/services/admin-page.service';
import { AccountComponent } from './models/account/account.component';
import { SecurityComponent } from './models/security/security.component';

const routes: Routes = [
      { path: "", component: HomeComponent, canActivate: [AdminPageBloqued] },
      { path: "connexion", component: ConnexionComponent, canActivate: [AdminPageBloqued]},
      { path: "inscription", component: InscriptionComponent, canActivate: [AdminPageBloqued]},
      { path: "SucesseRegister", component: SucesseRegisterComponent, canActivate: [AdminPageBloqued]},
      { path: "admin", component: AdminComponent, canActivate: [AdminPage]},
      { path: "adminProfil", component: AdminProfilComponent, canActivate: [AdminPage]},
      { path: "profilUpdate", component: ProfilUpdateComponent, canActivate: [AdminPage]},
      { path: "profilUpdate", component: ProfilUpdateComponent, canActivate: [AdminPage]},
      {
        path:"edit",
        children:[
          {path:"account", component:AccountComponent},
          {path:"security", component:SecurityComponent},
        ], 
        canActivate: [AdminPage]
      }
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
