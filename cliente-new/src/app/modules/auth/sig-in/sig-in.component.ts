import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigInComponent implements OnInit {

  public persona: any = {
    username: "",
    password: ""
  };

  constructor(private factory: FactoryService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.factory.post('persona/login', this.persona)
    .subscribe(
      (response: any) => {
         console.log(response);
         localStorage.setItem('user', JSON.stringify(response.data));
         this.router.navigate(['dashboard']);
      },
      (error: any) => {
        Swal.fire('Ops!', error.error.msg, 'error');
        console.log(error);
      }
    );
  }

}
