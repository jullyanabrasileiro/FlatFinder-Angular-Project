import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewFlatComponent } from './new-flat/new-flat.component';
import { ViewFlatComponent } from './view-flat/view-flat.component';
import { EditFlatComponent } from './edit-flat/edit-flat.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { FlatViewMessagesComponent } from './flat-view-messages/flat-view-messages.component';

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
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
