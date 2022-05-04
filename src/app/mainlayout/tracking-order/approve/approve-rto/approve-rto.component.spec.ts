import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRtoComponent } from './approve-rto.component';

describe('ApproveRtoComponent', () => {
  let component: ApproveRtoComponent;
  let fixture: ComponentFixture<ApproveRtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
