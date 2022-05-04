import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pichart2Component } from './pichart2.component';

describe('Pichart2Component', () => {
  let component: Pichart2Component;
  let fixture: ComponentFixture<Pichart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pichart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pichart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
