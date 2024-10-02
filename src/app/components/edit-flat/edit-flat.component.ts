import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Flat } from '../../models/flat.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-flat',
  templateUrl: './edit-flat.component.html',
  styleUrls: ['./edit-flat.component.css']
})
export class EditFlatComponent implements OnInit {
  flatForm: FormGroup;
  flatId: string = '';
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.flatForm = this.fb.group({
      city: ['', Validators.required],
      streetName: ['', Validators.required],
      streetNumber: ['', Validators.required],
      areaSize: ['', [Validators.required, Validators.min(1)]],
      hasAC: [false],
      yearBuilt: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      rentPrice: ['', [Validators.required, Validators.min(1)]],
      dateAvailable: ['', Validators.required]
    });
  }

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
      if (flat) {
        this.flatForm.patchValue(flat);
      }
    });
  }

  onSubmit(): void {
    if (this.flatForm.valid) {
      const flatData = this.flatForm.value;
      this.firestore.collection('flats').doc(this.flatId).update(flatData)
        .then(() => {
          console.log('Flat updated successfully');
          this.router.navigate(['/my-flats']);
        })
        .catch(error => {
          console.error('Error updating flat:', error);
        });
    }
  }
}
