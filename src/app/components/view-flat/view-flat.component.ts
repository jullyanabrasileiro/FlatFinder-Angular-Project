import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';
import { Flat } from '../../models/flat.model';

@Component({
  selector: 'app-view-flat',
  templateUrl: './view-flat.component.html',
  styleUrls: ['./view-flat.component.css']
})
export class ViewFlatComponent implements OnInit {
  flat: Flat | undefined;
  isOwner: boolean = false;
  userId: string = ''; // User ID of the logged-in user
  flatId: string = ''; // ID of the flat to be viewed

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.flatId = this.route.snapshot.paramMap.get('id')!;
    this.authService.user$.subscribe(user => {
      if (user) { 
        this.userId = user.uid;
        this.loadFlatDetails();
      } else {
        console.warn("No user is authenticated.");
      }
    });
}


loadFlatDetails(): void {
  this.firestore.collection<Flat>('flats').doc(this.flatId).valueChanges().subscribe((flat: Flat | undefined) => {
    this.flat = flat;
    if (flat) { 
      this.isOwner = flat.ownerId === this.userId; 
    }
  });
}


  editFlat(): void {
    this.router.navigate([`/edit-flat/${this.flatId}`]);
  }
}
