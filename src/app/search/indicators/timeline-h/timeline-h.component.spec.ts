import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineHComponent } from './timeline-h.component';

describe('TimelineHComponent', () => {
  let component: TimelineHComponent;
  let fixture: ComponentFixture<TimelineHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
