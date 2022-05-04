import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRtoComponent } from './track-rto.component';

describe('TrackRtoComponent', () => {
  let component: TrackRtoComponent;
  let fixture: ComponentFixture<TrackRtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackRtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackRtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
