import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    expect(component.registerForm?.valid).toBeFalsy();
  });

  it('should navigate to home on successful submission', () => {
    component.registerForm?.setValue({
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '2000-01-01',
      password: 'Password1!',
      confirmPassword: 'Password1!'
    });
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
