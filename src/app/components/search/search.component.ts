import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service'; // Assume you have an AuthService for user info
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  flats: any[] = [];
  userId: string = ''; // User ID of the logged-in user
  filter = {
    city: '',
    minPrice: 0,
    maxPrice: 10000,
    minAreaSize: 0,
    maxAreaSize: 10000
  };
  sort = 'city'; // Default sort field

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService, // Assume you have an AuthService to get current user info
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid; // Safely access user ID
        this.loadFlats(); // Load flats once user is authenticated
      }
    });
}


  loadFlats(): void {
    this.firestore.collection('flats').valueChanges()
      .subscribe(flats => {
        this.flats = flats;
      });
  }

  viewFlat(flatId: string): void {
    this.router.navigate([`/view-flat/${flatId}`]);
  }

  toggleFavorite(flatId: string): void {
    // Check if the flat is already a favorite
    this.firestore.collection('users').doc(this.userId).collection('favourites').doc(flatId).get().subscribe(doc => {
      if (doc.exists) {
        // Remove from favorites
        this.firestore.collection('users').doc(this.userId).collection('favourites').doc(flatId).delete();
      } else {
        // Add to favorites
        this.firestore.collection('users').doc(this.userId).collection('favourites').doc(flatId).set({});
      }
    });
  }

  applyFilters(): void {
    this.loadFlats();
    // Apply filtering and sorting here
    this.flats = this.flats.filter(flat => 
      flat.city.includes(this.filter.city) &&
      flat.rentPrice >= this.filter.minPrice &&
      flat.rentPrice <= this.filter.maxPrice &&
      flat.areaSize >= this.filter.minAreaSize &&
      flat.areaSize <= this.filter.maxAreaSize
    );
    this.flats.sort((a, b) => {
      if (this.sort === 'price') return a.rentPrice - b.rentPrice;
      if (this.sort === 'areaSize') return a.areaSize - b.areaSize;
      return a.city.localeCompare(b.city);
    });
  }
}

