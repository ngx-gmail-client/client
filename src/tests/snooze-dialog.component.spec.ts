import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnoozeDialogComponent } from '../app/components/snooze-dialog/snooze-dialog.component';

describe('SnoozeDialogComponent', () => {
  let component: SnoozeDialogComponent;
  let fixture: ComponentFixture<SnoozeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnoozeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnoozeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
