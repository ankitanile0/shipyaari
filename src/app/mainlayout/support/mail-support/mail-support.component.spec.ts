import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSupportComponent } from './mail-support.component';

describe('MailSupportComponent', () => {
  let component: MailSupportComponent;
  let fixture: ComponentFixture<MailSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
