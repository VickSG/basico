export class Usuario {
    public id!: string;
    public nombre!: string;
    public sala!: string;

    constructor(nombre: string = 'Sin-nombre', sala: string = 'sin-sala') {
        this.nombre = nombre;
        this.sala = sala;
    }
}
