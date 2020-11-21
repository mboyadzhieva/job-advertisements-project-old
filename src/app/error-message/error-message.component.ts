import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() control: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage(): string {
    if (this.control.touched && this.control.invalid){
      if (this.control.errors.required){
        return 'This field is required!';
      }

      if (this.control.errors.minlength){
        return `Not enough characters! Min length is ${this.control.errors.minlength.requiredLength}.
        Actual length: ${this.control.errors.minlength.actualLength}.`;
      }

      if (this.control.errors.email){
        return 'Not an actual email!';
      }
    }
    return '';
  }

}
