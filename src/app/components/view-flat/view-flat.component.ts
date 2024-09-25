import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-flat',
  templateUrl: './view-flat.component.html',
  styleUrls: ['./view-flat.component.css']
})
export class ViewFlatComponent implements OnInit {
  flat: any;
  isOwner: boolean = false;
  userId: string = ''; // User ID of the logged-in user
  flatId: string = ''; // ID of the flat to be viewed

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Assume you have an AuthService to get current user info
  ) {}

  ngOnInit(): void {
    this.flatId = this.route.snapshot.paramMap.get('id')!;
    this.authService.getCurrentUser().subscribe(user => {
      this.userId = user.uid;
      this.loadFlatDetails();
    });
  }

  loadFlatDetails(): void {
    this.firestore.collection('flats').doc(this.flatId).valueChanges().subscribe(flat => {
      this.flat = flat;
      // Check if the current user is the owner of the flat
      this.isOwner = flat.ownerId === this.userId; // Assuming you store ownerId in flat
    });
  }

  editFlat(): void {
    this.router.navigate([`/edit-flat/${this.flatId}`]);
  }
}
