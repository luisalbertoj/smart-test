import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPruebasComponent } from './plan-pruebas.component';

describe('PlanPruebasComponent', () => {
  let component: PlanPruebasComponent;
  let fixture: ComponentFixture<PlanPruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPruebasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
