import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivryAnalysisComponent } from './delivry-analysis.component';

describe('DelivryAnalysisComponent', () => {
  let component: DelivryAnalysisComponent;
  let fixture: ComponentFixture<DelivryAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelivryAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelivryAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
