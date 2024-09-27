import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogApplicantComponent } from './dialog-applicant.component';

describe('DialogApplicantComponent', () => {
  let component: DialogApplicantComponent;
  let fixture: ComponentFixture<DialogApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogApplicantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
