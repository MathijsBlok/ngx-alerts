import {Injectable} from '@angular/core';
import {Alert} from './alert.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AlertService {

    private _message: Subject<Alert> = new Subject();

    public getMessage(): Observable<Alert> {
        return this._message.asObservable();
    }

    public info(msg: string) {
        const message: Alert = {
            content: msg,
            type: 'info',
            alive: 0
        };
        this._message.next(message);
    }

    public danger(msg: string) {
        const message: Alert = {
            content: msg,
            type: 'danger',
            alive: 0
        };
        this._message.next(message);
    }

    public success(msg: string) {
        const message: Alert = {
            content: msg,
            type: 'success',
            alive: 0
        };
        this._message.next(message);
    }

    public warning(msg: string) {
        const message: Alert = {
            content: msg,
            type: 'warning',
            alive: 0
        };
        this._message.next(message);
    }
}
