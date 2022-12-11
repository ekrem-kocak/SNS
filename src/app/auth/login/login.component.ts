import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StateService } from 'src/app/shared/services/state.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private stateService: StateService, private alertService: AlertService, private router: Router) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  ngOnInit(): void {
  }

  login() {
    this.stateService.setLoading(true);
    this.authService.login(this.email?.value, this.password?.value).subscribe({
      next: (res) => {
        this.alertService.success('Welcome ' + res.email)
        this.router.navigate(["/"])
      },
      error: (err) => {
        console.log(err);
        this.alertService.error(err)
        this.stateService.setLoading(false)
      },
      complete: () => this.stateService.setLoading(false)
    })
  }

}
