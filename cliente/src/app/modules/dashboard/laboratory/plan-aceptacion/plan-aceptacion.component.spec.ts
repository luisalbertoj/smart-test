import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAceptacionComponent } from './plan-aceptacion.component';

describe('PlanAceptacionComponent', () => {
  let component: PlanAceptacionComponent;
  let fixture: ComponentFixture<PlanAceptacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanAceptacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAceptacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
