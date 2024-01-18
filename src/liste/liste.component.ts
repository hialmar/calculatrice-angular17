import { Component, EventEmitter, Output } from '@angular/core';
import { ListeOpeService } from '../liste-ope.service';
import { Operation } from '../operation';
import { SlicePipe } from '@angular/common';

// composant qui affiche la liste des 10 dernières opérations
@Component({
  selector: 'app-liste',
  standalone: true,
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
  imports: [SlicePipe], // filtre utilisé pour n'afficher que les 10 denières opérations
})
export class ListeComponent {
  // sortie pour envoyer l'opération
  @Output() emetteur = new EventEmitter<Operation>();

  // constructeur avec injection de la liste d'opérations
  constructor(public liste: ListeOpeService) {}

  // demande le rechargement de l'opération d'indice ind
  reload(ind: number): void {
    this.emetteur.emit(this.liste.getOperation(ind));
  }

  // efface l'opération d'indice ind
  delete(ind: number): void {
    this.liste.effaceOp(ind);
  }
}
