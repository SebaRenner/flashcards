import { Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { testCards } from '../../models/flashcard.model';

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

    remainingCards = signal(testCards);
    currentCard = computed(() => this.remainingCards()[0]);
    finished = computed(() => this.remainingCards().length === 0);
    showAnswer = signal(false);
    displayText = computed(() => {
      const current = this.currentCard();
      if (!current) return 'All done! 🎉';
      
      return this.showAnswer() 
        ? current.resultLanguage 
        : current.baseLanguage;
    });

    validateWord(value: string) {
      const text = value.toLowerCase();
      const cardElem = this.flashcardRef();
      const inputElem = this.inputFieldRef();

      if (!cardElem || !inputElem) return;

      let correctAnswer = false;
      const currentCard = this.currentCard();

      this.showAnswer.set(true);

      if (text == currentCard.resultLanguage.toLowerCase()) {
        cardElem.nativeElement.style.backgroundColor = '#4CAF50'
        correctAnswer = true;
      } 
      else {
        inputElem.nativeElement.style.backgroundColor = '#d10b25'
      }

      setTimeout(() => this.nextField(correctAnswer), this.TIMEOUT_UNTIL_NEXT_CARD);
    }

    nextField(correctAnswer: boolean) {
      const cardElem = this.flashcardRef();
      if (!cardElem) return;

      const currentCards = this.remainingCards();

      if (correctAnswer) {
        this.remainingCards.set(currentCards.slice(1));
      } else {
        this.remainingCards.set([...currentCards.slice(1), currentCards[0]]);
      }

      this.showAnswer.set(false);
      this.resetField()
    }

    resetField() {
      const cardElem = this.flashcardRef();
      const inputElem = this.inputFieldRef();

      if (!cardElem || !inputElem) return;

      cardElem.nativeElement.style.backgroundColor = '#f2b704';
      inputElem.nativeElement.style.backgroundColor = '#FFF'
      inputElem.nativeElement.value = '';
    }
}
