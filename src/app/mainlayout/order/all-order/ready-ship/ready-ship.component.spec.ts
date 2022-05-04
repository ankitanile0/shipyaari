import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyShipComponent } from './ready-ship.component';

describe('ReadyShipComponent', () => {
  let component: ReadyShipComponent;
  let fixture: ComponentFixture<ReadyShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
