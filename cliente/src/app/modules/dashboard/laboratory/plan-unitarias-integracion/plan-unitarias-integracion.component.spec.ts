import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanUnitariasIntegracionComponent } from './plan-unitarias-integracion.component';

describe('PlanUnitariasIntegracionComponent', () => {
  let component: PlanUnitariasIntegracionComponent;
  let fixture: ComponentFixture<PlanUnitariasIntegracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanUnitariasIntegracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanUnitariasIntegracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
