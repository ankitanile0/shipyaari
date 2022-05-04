import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkComponent } from './add-bulk.component';

describe('AddBulkComponent', () => {
  let component: AddBulkComponent;
  let fixture: ComponentFixture<AddBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
