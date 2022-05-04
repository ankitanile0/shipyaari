import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDeliveryComponent } from './courier-delivery.component';

describe('CourierDeliveryComponent', () => {
  let component: CourierDeliveryComponent;
  let fixture: ComponentFixture<CourierDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
