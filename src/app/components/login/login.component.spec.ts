import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login form', () => {
    expect(component.loginForm).toBeDefined();
  });

  it('should invalidate the form if email is not in proper format', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('invalid-email');
    expect(emailControl.valid).toBeFalsy();
  });

  it('should validate the form if all inputs are correct', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('validPassword123!');
    expect(component.loginForm.valid).toBeTruthy();
  });
});
