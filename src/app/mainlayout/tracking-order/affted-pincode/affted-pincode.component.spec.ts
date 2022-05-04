import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfftedPincodeComponent } from './affted-pincode.component';

describe('AfftedPincodeComponent', () => {
  let component: AfftedPincodeComponent;
  let fixture: ComponentFixture<AfftedPincodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfftedPincodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfftedPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
