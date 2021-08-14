import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPreconceptosComponent } from './import-preconceptos.component';

describe('ImportPreconceptosComponent', () => {
  let component: ImportPreconceptosComponent;
  let fixture: ComponentFixture<ImportPreconceptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPreconceptosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPreconceptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
