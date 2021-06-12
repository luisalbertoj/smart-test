import { Persona } from "./persona.model";
export interface Leccion {
    titulo: String;
    introduccion: String;
    observaciones: String;
    conclusiones: String;
    aprender: String;
    practicar: String;
    aplicar: String;
    slug: String;
    creador: Persona;
    
  }