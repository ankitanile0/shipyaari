import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTempComponent } from './sms-temp.component';

describe('SmsTempComponent', () => {
  let component: SmsTempComponent;
  let fixture: ComponentFixture<SmsTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
