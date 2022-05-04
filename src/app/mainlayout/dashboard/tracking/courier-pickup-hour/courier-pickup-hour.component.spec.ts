import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierPickupHourComponent } from './courier-pickup-hour.component';

describe('CourierPickupHourComponent', () => {
  let component: CourierPickupHourComponent;
  let fixture: ComponentFixture<CourierPickupHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierPickupHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierPickupHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
