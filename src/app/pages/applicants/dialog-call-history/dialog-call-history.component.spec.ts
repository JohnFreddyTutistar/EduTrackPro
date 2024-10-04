import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCallHistoryComponent } from './dialog-call-history.component';

describe('DialogCallHistoryComponent', () => {
  let component: DialogCallHistoryComponent;
  let fixture: ComponentFixture<DialogCallHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCallHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCallHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
