import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargePaymentComponent } from './recharge-payment.component';

describe('RechargePaymentComponent', () => {
  let component: RechargePaymentComponent;
  let fixture: ComponentFixture<RechargePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
