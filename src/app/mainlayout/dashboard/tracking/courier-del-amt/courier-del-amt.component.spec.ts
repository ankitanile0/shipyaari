import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDelAmtComponent } from './courier-del-amt.component';

describe('CourierDelAmtComponent', () => {
  let component: CourierDelAmtComponent;
  let fixture: ComponentFixture<CourierDelAmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierDelAmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierDelAmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
