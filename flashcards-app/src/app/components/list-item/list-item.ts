import { Component, inject, input, OnInit, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

    private fb = inject(NonNullableFormBuilder)

    readonly wordTypeOptions = Object.values(WordType);
    readonly form = this.fb.group({
        baseLanguage: ['', Validators.required],
        resultLanguage: ['', Validators.required],
        wordType: [WordType.Verb, Validators.required],
        category: ['', Validators.required],
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
      const flashcard: Flashcard = this.form.getRawValue();
      this.add.emit(flashcard);
      this.form.reset();
    }
}