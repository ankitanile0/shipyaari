import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pichart3Component } from './pichart3.component';

describe('Pichart3Component', () => {
  let component: Pichart3Component;
  let fixture: ComponentFixture<Pichart3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pichart3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pichart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
