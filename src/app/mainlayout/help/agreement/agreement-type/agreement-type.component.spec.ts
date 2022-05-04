import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTypeComponent } from './agreement-type.component';

describe('AgreementTypeComponent', () => {
  let component: AgreementTypeComponent;
  let fixture: ComponentFixture<AgreementTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
