import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';  

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewFlatComponent } from './components/new-flat/new-flat.component';
import { ViewFlatComponent } from './components/view-flat/view-flat.component';
import { EditFlatComponent } from './components/edit-flat/edit-flat.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { FlatViewMessagesComponent } from './components/flat-view-messages/flat-view-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NewFlatComponent,
    ViewFlatComponent,
    EditFlatComponent,
    FavouritesComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UpdateProfileComponent,
    AllUsersComponent,
    FlatViewMessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,  
    MatSidenavModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
