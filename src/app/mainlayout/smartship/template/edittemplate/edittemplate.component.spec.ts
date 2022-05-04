import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittemplateComponent } from './edittemplate.component';

describe('EdittemplateComponent', () => {
  let component: EdittemplateComponent;
  let fixture: ComponentFixture<EdittemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
