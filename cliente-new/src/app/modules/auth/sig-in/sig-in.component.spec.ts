import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigInComponent } from './sig-in.component';

describe('SigInComponent', () => {
  let component: SigInComponent;
  let fixture: ComponentFixture<SigInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creacion del componente', () => {
    expect(component).toBeTruthy();
  });
});
