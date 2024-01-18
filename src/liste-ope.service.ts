import { Injectable } from '@angular/core';
import { Operation } from './operation';

// Service qui gère la liste des opérations
@Injectable()
export class ListeOpeService {
  // la liste
  private listeOp: Operation[];

  // constructeur qui crée la liste vide
  constructor() {
    this.listeOp = [];
  }

  // méthode pour ajouter une opération
  ajouteOp(op1: number, op2: number, op: string, res: number): void {
    this.listeOp.unshift(new Operation(op1, op2, op, res));
  }

  // méthode pour effacer une opération
  effaceOp(ind: number): void {
    this.listeOp.splice(ind, 1);
  }

  // méthode pour récupérer la liste
  getListe(): Operation[] {
    return this.listeOp;
  }

  getOperation(ind: number): Operation {
    return this.listeOp[ind];
  }
}