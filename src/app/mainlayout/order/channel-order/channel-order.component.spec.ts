import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelOrderComponent } from './channel-order.component';

describe('ChannelOrderComponent', () => {
  let component: ChannelOrderComponent;
  let fixture: ComponentFixture<ChannelOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
