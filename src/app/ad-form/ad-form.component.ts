import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Advertisement } from '../advertisement.interface';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss']
})
export class AdFormComponent implements OnInit {

  @Output() adSubmitted = new EventEmitter<Advertisement>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', Validators.required]
    });
  }

  onSubmit(): void{
    const ad: Advertisement = {
      ...this.formGroup.value,
      likes: 0,
    };

    this.adSubmitted.emit(ad);
  }

}
