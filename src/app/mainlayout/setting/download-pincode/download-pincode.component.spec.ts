import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPincodeComponent } from './download-pincode.component';

describe('DownloadPincodeComponent', () => {
  let component: DownloadPincodeComponent;
  let fixture: ComponentFixture<DownloadPincodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadPincodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
