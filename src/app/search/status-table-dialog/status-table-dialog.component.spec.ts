import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTableDialogComponent } from './status-table-dialog.component';

describe('StatusTableDialogComponent', () => {
  let component: StatusTableDialogComponent;
  let fixture: ComponentFixture<StatusTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusTableDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
