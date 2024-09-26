import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-flats',
  templateUrl: './my-flats.component.html',
  styleUrls: ['./my-flats.component.css']
})
export class MyFlatsComponent implements OnInit {
  flats: any[] = [];
  userId: string = ''; // User ID of the logged-in user

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user){
       this.userId = user.uid;
       this.loadUserFlats();
      }
    });
  }

  loadUserFlats(): void {
    this.firestore.collection('flats', ref => ref.where('ownerId', '==', this.userId))
      .valueChanges()
      .subscribe(flats => {
        this.flats = flats;
      });
  }

  viewFlat(flatId: string): void {
    this.router.navigate([`/view-flat/${flatId}`]);
  }

  editFlat(flatId: string): void {
    this.router.navigate([`/edit-flat/${flatId}`]);
  }

  deleteFlat(flatId: string): void {
    if (confirm('Are you sure you want to delete this flat?')) {
      this.firestore.collection('flats').doc(flatId).delete()
        .then(() => {
          this.loadUserFlats(); // Reload the flats after deletion
        })
        .catch((error: Error) => {
          console.error('Error deleting flat: ', error);
        });
    }
  }

  addNewFlat(): void {
    this.router.navigate(['/new-flat']);
  }
}
