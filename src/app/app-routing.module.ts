import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  { path: 'new-flat', component: NewFlatComponent },
  { path: 'view-flat', component: ViewFlatComponent },
  { path: 'edit-flat', component: EditFlatComponent },
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