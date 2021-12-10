import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGrupoComponent } from './new-grupo.component';

describe('NewGrupoComponent', () => {
  let component: NewGrupoComponent;
  let fixture: ComponentFixture<NewGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
