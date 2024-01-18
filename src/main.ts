import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { ListeOpeService } from './liste-ope.service';
import { ListeComponent } from './liste/liste.component';
import { MemoireComponent } from './memoire/memoire.component';
import { Operation } from './operation';

// composant qui gère la base de la calculatrice et utilise les deux autres composants
@Component({
  selector: 'app-root', // le sélecteur est le nom de la balise qui va être créée et placée dans index.html
  standalone: true, // ce composant n'est pas dans un module
  templateUrl: 'main.html', // on a créé un fichier pour le template
  imports: [FormsModule, ListeComponent, MemoireComponent], // ne pas oublier FormsModule pour ngModel
  providers: [ListeOpeService], // La liste d'opération sera fournie par ce composant
})
export class App {
  // opérandes et résulats
  op1 = 0;
  op2 = 0;
  res = 0;
  opChoisie = 1; // indique l'opérande choisie pour ajouter les chiffres
  op1Virgule = false; // indique si on a appuyé sur la touche virgule pour l'opérande 1
  op2Virgule = false; // indique si on a appuyé sur la touche virgule pour l'opérande 2

  // constructeur avec injection du service ListeOpeService
  constructor(private liste: ListeOpeService) {}

  // opérations
  plus(): void {
    this.res = this.op1 + this.op2;
    this.liste.ajouteOp(this.op1, this.op2, '+', this.res);
  }
  moins(): void {
    this.res = this.op1 - this.op2;
    this.liste.ajouteOp(this.op1, this.op2, '-', this.res);
  }
  mult(): void {
    this.res = this.op1 * this.op2;
    this.liste.ajouteOp(this.op1, this.op2, '*', this.res);
  }
  div(): void {
    this.res = this.op1 / this.op2;
    this.liste.ajouteOp(this.op1, this.op2, '/', this.res);
  }

  // récupération de la valeur de la mémoire
  rec(val: number): void {
    this.op1 = val;
  }

  // permet de choisir un opérande quand on clique dans son input
  choisit(o: number): void {
    this.opChoisie = o;
  }

  // ajoute un chiffre dans l'opérande choisie
  ajoute(c: number): void {
    if (this.opChoisie === 1) {
      // transforme l'opérande actuel en chaine de caractère
      // l'opérateur ternaire permet de gérer le cas où l'utilisateur efface tous les chiffres de l'opérande
      let op1String = '' + (this.op1 === null ? '' : this.op1);
      // gère le cas d'un appui précédent sur la virgule pour cet opérande
      if (this.op1Virgule) {
        op1String += '.';
        this.op1Virgule = false;
      }
      // ajoute le chiffre
      op1String += c;
      // conversion en réel
      this.op1 = parseFloat(op1String);
    } else {
      // transforme l'opérande actuel en chaine de caractère
      // l'opérateur ternaire permet de gérer le cas où l'utilisateur efface tous les chiffres de l'opérande
      let op2String = '' + (this.op2 === null ? '' : this.op2);
      // gère le cas d'un appui précédent sur la virgule pour cet opérande
      if (this.op2Virgule) {
        op2String += '.';
        this.op2Virgule = false;
      }
      // ajoute le chiffre
      op2String += c;
      // conversion en réel
      this.op2 = parseFloat(op2String);
    }
  }

  // gère l'appui sur la virgule
  ajouteVirgule(): void {
    // selon l'opérande
    if (this.opChoisie === 1) {
      // vérifie si on n'avait pas déjà appuyé sur la virgule pour cet opérande
      if (!this.op1Virgule) {
        // met le booléen à true, la virgule sera gérée lors d'un futur appui sur un chiffre
        this.op1Virgule = true;
      } else {
        // erreur de manipulation, on a appelé deux fois sur la virgule
        this.op1Virgule = false;
        // on remet l'opérande à 0
        this.op1 = 0;
      }
    } else {
      // vérifie si on n'avait pas déjà appuyé sur la virgule pour cet opérande
      if (!this.op2Virgule) {
        // met le booléen à true, la virgule sera gérée lors d'un futur appui sur un chiffre
        this.op2Virgule = true;
      } else {
        // erreur de manipulation, on a appelé deux fois sur la virgule
        this.op2Virgule = false;
        // on remet l'opérande à 0
        this.op2 = 0;
      }
    }
  }

  // recharge les valeurs de l'opération dans les opérandes et le résultat
  reload(op: Operation): void {
    this.op1 = op.op1;
    this.op2 = op.op2;
    this.res = op.res;
  }
}

// initialise l'application
bootstrapApplication(App);
