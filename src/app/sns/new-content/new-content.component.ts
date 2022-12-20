import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'new-content',
  templateUrl: './new-content.component.html',
  styleUrls: ['./new-content.component.scss']
})
export class NewContentComponent {

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
