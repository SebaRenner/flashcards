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
        baseLanguage: new FormControl('', { nonNullable: true, validators: Validators.required }),
        resultLanguage: new FormControl('', { nonNullable: true, validators: Validators.required }),
        wordType: new FormControl(WordType.Verb, { nonNullable: true, validators: Validators.required }),
        category: new FormControl('', { nonNullable: true, validators: Validators.required })
    });

    get isReadOnly(): boolean {
        return !!this.data();
    }

    ngOnInit() {
        const cardData = this.data();
        if (cardData) {
            this.form.patchValue(cardData);
            this.form.disable();
        }
    }

    removeItem() {
      this.remove.emit();
    }

    addItem() {
      const flashcard: Flashcard = this.form.getRawValue() as Flashcard;
      this.add.emit(flashcard);
      this.form.reset();
    }
}