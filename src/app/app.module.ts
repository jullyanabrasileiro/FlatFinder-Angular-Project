import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewFlatComponent } from './components/new-flat/new-flat.component';
import { ViewFlatComponent } from './components/view-flat/view-flat.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { FlatViewMessagesComponent } from './components/flat-view-messages/flat-view-messages.component';
import { MyFlatsComponent } from './components/my-flats/my-flats.component';

@NgModule({
  declarations: [
    AppComponent,
    NewFlatComponent,
    ViewFlatComponent,
    FavouritesComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UpdateProfileComponent,
    AllUsersComponent,
    FlatViewMessagesComponent,
    MyFlatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
