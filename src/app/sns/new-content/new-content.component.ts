import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StateService } from 'src/app/shared/services/state.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Content } from '../Content';
import { ContentService } from '../content.service';

@Component({
  selector: 'new-content',
  templateUrl: './new-content.component.html',
  styleUrls: ['./new-content.component.scss']
})
export class NewContentComponent {

  contentForm = new FormGroup({
    department: new FormControl('', Validators.required),
    lesson: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private userService: UserService, private contentService: ContentService, private alertService: AlertService, private stateService: StateService) { }

  logout() {
    this.authService.logout();
  }

  createContent() {
    if(this.contentForm.invalid){
      return
    }
    this.stateService.setLoading(true);
    let newContent: Content = {
      department: this.contentForm.get('department')?.value!,
      lesson: this.contentForm.get('lesson')?.value!,
      class: +this.contentForm.get('class')?.value!,
      description: this.contentForm.get('description')?.value!,
      userDto: this.userService.user.getValue()!
    }

    this.contentService.createContent(newContent).subscribe({
      next: (content) => {
        this.alertService.success("Successful")
        this.contentForm.reset();
      },
      error: (err) => {
        this.alertService.error("Err")
      },
      complete: () => {
        this.stateService.setLoading(false);
      }
    })
  }
}
