import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;  
  isAdmin: boolean = false; 

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    
    this.user = this.authService.getLoggedInUser();
    this.isAdmin = this.authService.isAdmin();  
  }

  editProfile() {
    this.router.navigate(['/profile-update', this.user.id]);
  }
}
