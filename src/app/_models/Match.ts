import { Court } from "./Court";
import { User } from "./User";

export interface Match{
    id?: number;
    fecha: Date;
    hora: string;
    pista: Court;
    creador: User;
    jugadores: User[];
}