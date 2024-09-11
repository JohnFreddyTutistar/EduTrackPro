import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTeamTableComponent } from './review-team-table.component';

describe('ReviewTeamTableComponent', () => {
  let component: ReviewTeamTableComponent;
  let fixture: ComponentFixture<ReviewTeamTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTeamTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewTeamTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
