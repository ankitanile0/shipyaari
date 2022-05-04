import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePickupComponent } from './approve-pickup.component';

describe('ApprovePickupComponent', () => {
  let component: ApprovePickupComponent;
  let fixture: ComponentFixture<ApprovePickupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePickupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
