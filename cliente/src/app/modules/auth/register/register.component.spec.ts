import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';

import { RegisterComponent } from './register.component';

class FactoryServiceStub {
  user = null;
  post() {
    return of(true);
  }
  getAll() {
    return of(true);
  }
  loadUser() {}
  returnAsObservable() {
    return of(true);
  }
  decryptData() {
    return '';
  }
}
class ToastrServiceStub {
  error() {}
  info() {}
}

class NgxSpinnerServiceStub {
  show() {}
  hide() {}
}

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: FactoryService, useClass: FactoryServiceStub },
        { provide: ToastrService, useClass: ToastrServiceStub },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('When component is initialized', () => {
    it('Should create form', () => {
      expect(Object.keys(component.registerForm.controls)).toEqual([
        'nombre',
        'apellido',
        'email',
        'username',
        'password',
        'idRol',
        'grupos',
        'codigoRegistro',
      ]);
    });
  });

  describe('When register user', () => {
    it('Should register user', () => {
      component.registrar();
    });
  });
});
function of(arg0: boolean) {
  throw new Error('Function not implemented.');
}
