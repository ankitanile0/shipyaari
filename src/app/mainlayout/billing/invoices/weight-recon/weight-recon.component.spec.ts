import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightReconComponent } from './weight-recon.component';

describe('WeightReconComponent', () => {
  let component: WeightReconComponent;
  let fixture: ComponentFixture<WeightReconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightReconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightReconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
