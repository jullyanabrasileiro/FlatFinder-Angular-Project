import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewFlatComponent } from './components/new-flat/new-flat.component';
import { ViewFlatComponent } from './components/view-flat/view-flat.component';
import { EditFlatComponent } from './components/edit-flat/edit-flat.component';
import { MyFlatsComponent } from './components/my-flats/my-flats.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { FlatViewMessagesComponent } from './components/flat-view-messages/flat-view-messages.component';

const routes: Routes = [
  { path: 'new-flat', component: NewFlatComponent },
  { path: 'view-flat', component: ViewFlatComponent },
  { path: 'edit-flat', component: EditFlatComponent },
  { path: 'my-flats', component: MyFlatsComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'all-users', component: AllUsersComponent },
  { path: 'flat-view-messages', component: FlatViewMessagesComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }