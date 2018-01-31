import {Observable} from "rxjs/Observable";

export interface Alert {
    content: string;
    type: string;
    alive: Observable<number>;
}
