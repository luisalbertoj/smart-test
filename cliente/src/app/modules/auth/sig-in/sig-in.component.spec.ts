import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { FactoryService } from 'src/app/services/factory.service';

import { SigInComponent } from './sig-in.component';

class FactoryServiceStub {
  user = null;
  post() {
    return of(true);
  }
  loadUser() {
    return of(this.user);
  }
  returnAsObservable() {
    return of(true);
  }
}
class ToastrServiceStub {
  warning() {}
}

class NgxSpinnerServiceStub {
  show() {}
  hide() {}
}

fdescribe('SigInComponent', () => {
  let component: SigInComponent;
  let fixture: ComponentFixture<SigInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [SigInComponent],
      providers: [
        { provide: FactoryService, useClass: FactoryServiceStub },
        { provide: ToastrService, useClass: ToastrServiceStub },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creacion del componente', () => {
    expect(component).toBeTruthy();
  });

  describe('When component is initialized', () => {
    it('Should create form', () => {
      expect(Object.keys(component.loginFormGroup.controls)).toEqual([
        'username',
        'password',
      ]);
    });
  });

  describe('When login user', () => {
    it('Should login user', () => {
      const open = spyOn((<any>component).toastr, 'warning');
      const show = spyOn((<any>component).spinner, 'show');
      const hide = spyOn((<any>component).spinner, 'hide');
      const navigate = spyOn((<any>component).router, 'navigate');

      component.login();

      expect(show).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalled();
      expect(hide).toHaveBeenCalled();
    });
  });
});
