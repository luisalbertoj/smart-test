import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestComponent } from './view-test.component';

describe('ViewTestComponent', () => {
  let component: ViewTestComponent;
  let fixture: ComponentFixture<ViewTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente creado', () => {
    expect(component).toBeTruthy();
  });
});
