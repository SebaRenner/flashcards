import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Flashcard, WordType } from '../../models/flashcard.model';

@Component({
  selector: 'app-list-item',
  imports: [ReactiveFormsModule],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem implements OnInit {
    data = input<Flashcard>();
    remove = output<void>();
    add = output<Flashcard>();

    readonly wordTypeOptions = Object.values(WordType);
    readonly form = new FormGroup({
        baseLanguage: new FormControl('', Validators.required),
        resultLanguage: new FormControl('', Validators.required),
        wordType: new FormControl(WordType.Verb, Validators.required),
        category: new FormControl('', Validators.required)
    });

    ngOnInit() {
        const cardData = this.data();
        if (cardData) {
            this.form.patchValue(cardData);
        }
    }

    removeItem() {
      this.remove.emit();
    }

    addItem() {
      const flashcard: Flashcard = this.form.getRawValue() as Flashcard;
      this.add.emit(flashcard);
    }
}