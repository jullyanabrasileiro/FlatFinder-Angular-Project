import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: any[] = [];
  userId: string = ''; // User ID of the logged-in user

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.loadFavourites();
      }
    });
  }

  loadFavourites(): void {
    this.firestore.collection('users').doc(this.userId).collection('favourites').valueChanges()
      .subscribe(favourites => {
        this.favourites = favourites;
      });
  }

  viewFlat(flatId: string): void {
    this.router.navigate([`/view-flat/${flatId}`]);
  }

  removeFavourite(flatId: string): void {
    if (confirm('Are you sure you want to remove this flat from your favourites?')) {
      this.firestore.collection('users').doc(this.userId).collection('favourites').doc(flatId).delete()
        .then(() => {
          this.loadFavourites(); // Reload the favourites after removal
        })
        .catch((error: Error) => {
          console.error('Error removing favourite: ', error);
        });
    }
  }
}

