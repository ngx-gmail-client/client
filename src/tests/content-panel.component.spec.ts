import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPanelComponent } from '../app/components/content-panel/content-panel.component';

describe('ContentPanelComponent', () => {
  let component: ContentPanelComponent;
  let fixture: ComponentFixture<ContentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
