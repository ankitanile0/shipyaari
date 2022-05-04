import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytmcallbackComponent } from './paytmcallback.component';

describe('PaytmcallbackComponent', () => {
  let component: PaytmcallbackComponent;
  let fixture: ComponentFixture<PaytmcallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaytmcallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaytmcallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
