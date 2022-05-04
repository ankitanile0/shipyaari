import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pichart1Component } from './pichart1.component';

describe('Pichart1Component', () => {
  let component: Pichart1Component;
  let fixture: ComponentFixture<Pichart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pichart1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pichart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
