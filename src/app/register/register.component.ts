import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

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

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { match: true };
  }

  ageValidator(control: { value: string | number | Date; }) {
    const birthDate = new Date(control.value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return (age >= 18 && age <= 120) ? null : { age: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registration successful', this.registerForm.value);
      this.router.navigate(['/home']); // Adjust the route if necessary
    }
  }
}
