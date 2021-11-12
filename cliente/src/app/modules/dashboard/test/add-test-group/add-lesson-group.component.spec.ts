import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonGroupComponent } from './add-lesson-group.component';

describe('AddLessonGroupComponent', () => {
  let component: AddLessonGroupComponent;
  let fixture: ComponentFixture<AddLessonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
