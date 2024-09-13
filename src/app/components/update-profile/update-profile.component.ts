import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
updateProfile() {
throw new Error('Method not implemented.');
}
  profileForm!: FormGroup<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
