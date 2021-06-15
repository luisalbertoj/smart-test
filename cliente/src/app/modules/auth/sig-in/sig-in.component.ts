import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    this.factory.post('persona/login', this.persona).subscribe(
      (response: any) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.router.navigate(['dashboard']);
      },
      (error: any) => {
        this.toastr.warning('Usuario o contraseña  incorrectos!', 'Error!');
        console.log(error);
      }
    );
  }
}
