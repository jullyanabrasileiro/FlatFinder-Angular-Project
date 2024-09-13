import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;  
  isAdmin: boolean = false; 

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser();
    this.isAdmin = this.authService.isAdmin();  
  }

  editProfile() {
    if (this.user) {
      this.router.navigate(['/profile-update', this.user.email]);
    }
  }
}
