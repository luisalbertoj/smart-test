import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryService } from 'src/app/services/factory.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss'],
})
export class SigInComponent implements OnInit {
  public persona: any = {
    username: '',
    password: '',
  };

  loginFormGroup: FormGroup;

  constructor(
    private factory: FactoryService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private formbuilder: FormBuilder
  ) {
    this.loginFormGroup = this.formbuilder.group({});
  }

  ngOnInit(): void {
    this.factory.loadUser();
    this.factory.user ? this.router.navigate(['dashboard']) : 0;
    this.factory.returnAsObservable().subscribe((subs: any) => {
      subs === true ? this.spinner.hide() : this.spinner.show();
    });
    this.loginFormGroup = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.spinner.show();
    console.log(this.loginFormGroup.controls);
    this.persona = {
      username: this.loginFormGroup.controls['username'].value,
      password: this.loginFormGroup.controls['password'].value,
    };
    this.factory.post('persona/login', this.persona).subscribe(
      (response: any) => {
        if (response.code === 400) {
          this.toastr.warning('Usuario o contraseña  incorrectos!', 'Error!');
          this.spinner.hide();
        } else {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.factory.loadUser();
          this.spinner.hide();
          this.router.navigate(['dashboard']);
        }
      },
      (error: any) => {
        this.toastr.warning('Usuario o contraseña  incorrectos!', 'Error!');
        console.log(error);
        this.spinner.hide();
      }
    );
  }
}
