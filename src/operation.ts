// Classe stockant les informations d'une opération
export class Operation {
  constructor(
    public op1: number,
    public op2: number,
    public op: string,
    public res: number
  ) {}

  // méthode pour afficher une opération
  affiche(): string {
    return this.op1 + " " + this.op + " " + this.op2 + " = " + this.res;
  }
}
