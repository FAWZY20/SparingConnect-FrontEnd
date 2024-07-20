import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './models/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConnexionComponent } from './models/connexion/connexion.component';
import { InscriptionComponent } from './models/inscription/inscription.component';
import { AdminComponent } from './models/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { SucesseRegisterComponent } from './models/sucesse-register/sucesse-register.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { AdminProfilComponent } from './models/admin-profil/admin-profil.component';
import { ProfilUpdateComponent } from './models/profil-update/profil-update.component';
import { ProfilComponent } from './models/profil/profil.component';
import { AccountComponent } from './models/account/account.component';
import { SecurityComponent } from './models/security/security.component';
import { HeaderSettingComponent } from './components/header-setting/header-setting.component';
import { PublicProfilComponent } from './models/public-profil/public-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ConnexionComponent,
    InscriptionComponent,
    AdminComponent,
    SucesseRegisterComponent,
    HeaderAdminComponent,
    AdminProfilComponent,
    ProfilUpdateComponent,
    ProfilComponent,
    AccountComponent,
    SecurityComponent,
    HeaderSettingComponent,
    PublicProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
