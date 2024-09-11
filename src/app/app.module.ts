import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
