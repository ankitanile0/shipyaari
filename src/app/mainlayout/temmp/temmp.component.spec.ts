import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemmpComponent } from './temmp.component';

describe('TemmpComponent', () => {
  let component: TemmpComponent;
  let fixture: ComponentFixture<TemmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
