import { Court } from "./Court";
import { User } from "./User";

export interface SetCourt {
    id: number;
    nombre: string;
    ciudad: string;
    direccion: string;
    img: string;
    pistasDentroDelConjunto: Court[];
    precioDeReserva: number;
    precioPorHoraConLuz: number;
    precioPorHoraSinLuz: number;
    precioPorHoraFinDeSemana: number;
    horaActivacionLuz: string;
}
  