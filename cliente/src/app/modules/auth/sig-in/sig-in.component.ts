import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryService } from 'src/app/services/factory.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private factory: FactoryService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.factory.loadUser();
    this.factory.user ? this.router.navigate(['dashboard']) : 0;
    this.factory.returnAsObservable().subscribe((subs) => {
      subs === true ? this.spinner.hide() : this.spinner.show();
    });
  }

  login(): void {
    this.spinner.show();
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
