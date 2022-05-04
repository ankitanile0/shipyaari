import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTypeVerContComponent } from './agreement-type-ver-cont.component';

describe('AgreementTypeVerContComponent', () => {
  let component: AgreementTypeVerContComponent;
  let fixture: ComponentFixture<AgreementTypeVerContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementTypeVerContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTypeVerContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
