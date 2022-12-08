export interface elementoLista {
    contenido: string;
    estatus: boolean;
  }
  
export interface acumuladorTiempoString {
    hora: string;
    minuto: string;
    segundo: string;
  }

export interface acumuladorTiempoNumber {
    hora: number;
    minuto: number;
    segundo: number;
  }
  
export  interface registroActividad {
    nombre: string;
    prioridadAlta: boolean;
    autor: string;
    cliente: string;
    proyecto: string;
    fecha: string;
    tiempoInicio: number;
    tiempoFinal: number;
    tiempoAcumulado: acumuladorTiempoString;
    lista: elementoLista[];
  }
  