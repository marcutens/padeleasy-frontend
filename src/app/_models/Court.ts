import { Reserve } from "./Reserve";
import { SetCourt } from "./SetCourts";

export interface Court {
    id: number;
    setCourt: SetCourt;
    numberCourtInsideSetCourt: number;
    setCourtName: string;
    horadeInicio: number;
    horadeFin: number;
    reserveList: Reserve[];
}
  