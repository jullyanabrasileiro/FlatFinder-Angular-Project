import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-flat',
  templateUrl: './new-flat.component.html',
  styleUrls: ['./new-flat.component.css']
})
export class NewFlatComponent implements OnInit {
  flatForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with validation rules
    this.flatForm = this.fb.group({
      city: ['', Validators.required],
      streetName: ['', Validators.required],
      streetNumber: ['', [Validators.required, Validators.min(1)]],
      areaSize: ['', [Validators.required, Validators.min(1)]],
      hasAC: [false],
      yearBuilt: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      rentPrice: ['', [Validators.required, Validators.min(1)]],
      dateAvailable: ['', Validators.required]
    });
  }

  // This method is triggered when the form is submitted
  onSubmit(): void {
    if (this.flatForm.valid) {
      // Prepare the flat data to be stored
      const flatData = this.flatForm.value;

      // Add the flat data to Firestore under the 'flats' collection
      this.firestore.collection('flats').add(flatData)
        .then(() => {
          // On successful save, redirect the user to their home page
          this.router.navigate(['/home']);
        })
        .catch((error : Error) => {
          console.error('Error adding flat: ', error);
        });
    }
  }
}

