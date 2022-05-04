import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTypeVerComponent } from './agreement-type-ver.component';

describe('AgreementTypeVerComponent', () => {
  let component: AgreementTypeVerComponent;
  let fixture: ComponentFixture<AgreementTypeVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementTypeVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTypeVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
