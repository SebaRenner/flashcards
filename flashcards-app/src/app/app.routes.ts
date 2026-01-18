import { Routes } from '@angular/router';
import { Wordcheck } from './features/wordcheck/wordcheck';
import { Wordlist } from './features/wordlist/wordlist';

export const routes: Routes = [
    {
        path: '',
        component: Wordlist
    },
    {
        path: 'test',
        component: Wordcheck
    }
];
