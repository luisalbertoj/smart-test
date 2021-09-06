import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VercalificarComponent } from './vercalificar.component';

describe('VercalificarComponent', () => {
  let component: VercalificarComponent;
  let fixture: ComponentFixture<VercalificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VercalificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VercalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
