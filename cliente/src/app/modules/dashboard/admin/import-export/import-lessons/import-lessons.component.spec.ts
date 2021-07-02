import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLessonsComponent } from './import-lessons.component';

describe('ImportLessonsComponent', () => {
  let component: ImportLessonsComponent;
  let fixture: ComponentFixture<ImportLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportLessonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
