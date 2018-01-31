import {Injectable, Inject} from '@angular/core';
import {Alert} from '../model/alert.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ALERT_CONFIG} from '../alert.config';
import {AlertConfig} from '../model/alert-config.model';

@Injectable()
export class AlertService {

    private _message: Subject<Alert> = new Subject();

    constructor(@Inject(ALERT_CONFIG) private config: AlertConfig){
    }

    public get message(): Observable<Alert> {
        return this._message.asObservable();
    }

    public info(msg: string) {
        this._message.next(this.createAlert(msg, 'info'));
    }

    public danger(msg: string) {
        this._message.next(this.createAlert(msg, 'danger'));
    }

    public success(msg: string) {
        this._message.next(this.createAlert(msg, 'success'));
    }

    public warning(msg: string) {
        this._message.next(this.createAlert(msg, 'warning'));
    }

    private createAlert(msg: string, type: string): Alert {
        return {
            content: msg,
            type: type,
            alive: Observable.interval(this.config.timeout).take(1)
        };
    }
}
