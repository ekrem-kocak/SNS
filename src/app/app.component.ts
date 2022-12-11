import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading = false;

  constructor(private stateService: StateService, private authService:AuthService) {
    this.stateService._loading.subscribe(state => {
      this.loading = state;
    })
  }

  ngOnInit(): void {
    this.authService.autoLogin()
  }

  title = 'snss';
}
