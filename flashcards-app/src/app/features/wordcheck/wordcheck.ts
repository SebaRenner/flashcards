import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { Flashcard, WordType } from '../../models/flashcard.model';

@Component({
  selector: 'app-wordcheck',
  imports: [],
  templateUrl: './wordcheck.html',
  styleUrl: './wordcheck.css',
})
export class Wordcheck {
    readonly TIMEOUT_UNTIL_NEXT_CARD = 2000;
    readonly flashcardRef = viewChild<ElementRef>('card');
    readonly inputFieldRef = viewChild<ElementRef>('inputField');

    flashcards: Flashcard[] = [{
      baseLanguage: 'Hund', 
      resultLanguage: 'Dog',
      category: 'Animals',
      wordType: WordType.Noun
    }]

    validateWord(value: string) {
      const text = value.toLowerCase();
      const cardElem = this.flashcardRef();
      const inputElem = this.inputFieldRef();

      if (!cardElem || !inputElem) return;

      if (text == this.flashcards[0].resultLanguage.toLowerCase()) {
        cardElem.nativeElement.style.backgroundColor = '#4CAF50'
        cardElem.nativeElement.textContent = value
      } 
      else {
        inputElem.nativeElement.style.backgroundColor = '#d10b25'
        cardElem.nativeElement.textContent = this.flashcards[0].resultLanguage
      }

      setTimeout(() => this.resetField(), this.TIMEOUT_UNTIL_NEXT_CARD);
    }

    resetField() {
      const cardElem = this.flashcardRef();
      const inputElem = this.inputFieldRef();

      if (!cardElem || !inputElem) return;

      cardElem.nativeElement.textContent = this.flashcards[0].baseLanguage;
      cardElem.nativeElement.style.backgroundColor = '#f2b704';
      inputElem.nativeElement.style.backgroundColor = '#FFF'
      inputElem.nativeElement.value = '';
    }
}
