import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [
    NgIf,
    NgbToast
  ],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.scss'
})
export class ErrorToastComponent {
  @Input() message: string = 'An error has occurred. Try again';
  @Input() showing: boolean = false;
  @Input() autoHide: boolean = true;
  @Input() autoHideDuration: number = 5000;
}
