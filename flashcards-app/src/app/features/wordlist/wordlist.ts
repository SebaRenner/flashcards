import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ListItem } from '../../components/list-item/list-item';
import { Flashcard, testCards } from '../../models/flashcard.model';

@Component({
  selector: 'app-wordlist',
  imports: [ListItem],
  templateUrl: './wordlist.html',
  styleUrl: './wordlist.css',
})
export class Wordlist {
  private router = inject(Router);

  cards: Flashcard[] = testCards;

  startTest() {
    this.router.navigate(['test']);
  }
}