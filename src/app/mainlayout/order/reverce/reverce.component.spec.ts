import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverceComponent } from './reverce.component';

describe('ReverceComponent', () => {
  let component: ReverceComponent;
  let fixture: ComponentFixture<ReverceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReverceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
