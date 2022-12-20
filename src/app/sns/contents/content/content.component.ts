import { Component, Input } from '@angular/core';
import { Content } from '../../Content';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() content: Content | null = null;

  getContentHeader(name: string): string {
    return name.slice(0, 1).toUpperCase();
  }
}
