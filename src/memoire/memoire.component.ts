import { Component, EventEmitter, Input, Output } from '@angular/core';

// Composant qui gère la mémoire
@Component({
  selector: 'app-memoire',
  standalone: true,
  templateUrl: './memoire.component.html',
  styleUrls: ['./memoire.component.css'],
})
export class MemoireComponent {
  // entrée pour récupérer le résultat courant
  @Input() res: number = 0;

  // sortie pour envoyer le nombre en mémoire
  @Output() emetteur = new EventEmitter<number>();

  // nombre en mémoire
  mem: number;

  // constructeur
  constructor() {
    this.mem = 0;
  }

  // permet de mettre en mémoire le dernier résultat
  memoriser() {
    this.mem = this.res;
  }

  // envoie le nombre en mémoire
  recall() {
    this.emetteur.emit(this.mem);
  }
}
