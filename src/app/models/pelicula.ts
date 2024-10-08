export class Pelicula {
  id: number;
  nombre: string;
  tipo: 'terror' | 'comedia' | 'amor' | 'otros';
  fechaEstreno: Date
  cantidadPublico: number;
  imagen: string;
  protagonista: any;

  constructor(
    id: number,
    nombre: string,
    tipo: 'terror' | 'comedia' | 'amor' | 'otros',
    fechaEstreno: Date,
    cantidadPublico: number,
    imagen: string,
    protagonista: any
  ) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.fechaEstreno = fechaEstreno;
    this.cantidadPublico = cantidadPublico;
    this.imagen = imagen;
    this.protagonista = protagonista;
  }
}
