import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyPickComponent } from './ready-pick.component';

describe('ReadyPickComponent', () => {
  let component: ReadyPickComponent;
  let fixture: ComponentFixture<ReadyPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
