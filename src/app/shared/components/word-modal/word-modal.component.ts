import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-word-modal',
  templateUrl: './word-modal.component.html',
  styleUrls: ['./word-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordModalComponent implements OnInit {

  public readonly form = this.fb.group({
    word: ['123123', Validators.required],
    translation: ['', Validators.required],
    isVerb: [false],
    _id: [''],
    isFavorite: [false]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
