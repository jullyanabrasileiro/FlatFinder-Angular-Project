import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatViewMessagesComponent } from './flat-view-messages.component';

describe('FlatViewMessagesComponent', () => {
  let component: FlatViewMessagesComponent;
  let fixture: ComponentFixture<FlatViewMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlatViewMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatViewMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
