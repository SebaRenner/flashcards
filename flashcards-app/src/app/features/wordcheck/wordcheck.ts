import { Component, computed, model, signal } from '@angular/core';
import { testCards } from '../../models/flashcard.model';
import { FormsModule } from '@angular/forms';

enum AnswerState {
  Default = 'default',
  Correct = 'correct',
  Incorrect = 'incorrect'
}

@Component({
  selector: 'app-wordcheck',
  imports: [FormsModule],
  templateUrl: './wordcheck.html',
  styleUrl: './wordcheck.css',
})
export class Wordcheck {
    private readonly TIMEOUT_UNTIL_NEXT_CARD = 2000;

    readonly AnswerState = AnswerState;

    inputValue = model('');
    remainingCards = signal(testCards);
    currentCard = computed(() => this.remainingCards()[0]);
    finished = computed(() => this.remainingCards().length === 0);
    showAnswer = signal(false);
    answerState = signal<AnswerState>(AnswerState.Default);
    
    displayText = computed(() => {
      const current = this.currentCard();
      if (!current) return 'All done! 🎉';
      
      return this.showAnswer() 
        ? current.resultLanguage 
        : current.baseLanguage;
    });

    validateWord() {
      const text = this.inputValue().toLowerCase();
      const currentCard = this.currentCard();
      this.showAnswer.set(true);

      if (text === currentCard.resultLanguage.toLowerCase()) {
        this.answerState.set(AnswerState.Correct);
        setTimeout(() => this.nextCard(true), this.TIMEOUT_UNTIL_NEXT_CARD);
      } else {
        this.answerState.set(AnswerState.Incorrect);
        setTimeout(() => this.nextCard(false), this.TIMEOUT_UNTIL_NEXT_CARD);
      }
    }

    private nextCard(correctAnswer: boolean) {
      const currentCards = this.remainingCards();

      if (correctAnswer) {
        this.remainingCards.set(currentCards.slice(1));
      } else {
        this.remainingCards.set([...currentCards.slice(1), currentCards[0]]);
      }

      this.showAnswer.set(false);
      this.resetField();
    }

    private resetField() {
      this.answerState.set(AnswerState.Default);
      this.inputValue.set('');
    }
}