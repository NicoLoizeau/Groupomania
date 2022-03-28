import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginComponent } from './acceuil/login/login.component';
import { SignupComponent } from './acceuil/signup/signup.component';
import { SignupFormComponent } from './acceuil/signup/signup-form/signup-form.component';
import { BodyComponent } from './body/body.component';
import { NavComponent } from './body/nav/nav.component';
import { PublicationsComponent } from './body/publications/publications.component';
import { PublicationComponent } from './body/publication/publication.component';

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    LoginComponent,
    SignupComponent,
    SignupFormComponent,
    BodyComponent,
    NavComponent,
    PublicationsComponent,
    PublicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
