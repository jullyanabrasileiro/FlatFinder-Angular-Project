import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: ['', [Validators.required, this.ageValidator]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).*/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Validator for matching passwords
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { match: true };
  }

  // Validator for checking age
  ageValidator(control: { value: string | number | Date; }) {
    const birthDate = new Date(control.value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return (age >= 18 && age <= 120) ? null : { age: true };
  }

  // Submit the registration form
  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, firstName, lastName, birthDate } = this.registerForm.value;

      // Create user with Firebase Authentication
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            this.firestore.collection('users').doc(user.uid).set({
              uid: user.uid,
              email: user.email,
              firstName: firstName,
              lastName: lastName,
              birthDate: birthDate,
            })
            .then(() => {
              console.log('User registered successfully!');
              this.router.navigate(['/search']);
            })
            .catch((error) => {
              console.error('Error saving user information:', error);
            });
          }
        })
        .catch((error) => {
          console.error('Registration failed:', error);
        });
    }
  }
}
