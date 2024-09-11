import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFlatComponent } from './view-flat.component';

describe('ViewFlatComponent', () => {
  let component: ViewFlatComponent;
  let fixture: ComponentFixture<ViewFlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFlatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
