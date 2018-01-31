import {Inject, Injectable} from '@angular/core';
import {Alert} from '../model/alert.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ALERT_CONFIG} from '../alert.config';
import {AlertConfig} from '../model/alert-config.model';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AlertService {

    private dispatcher = new Subject<{ type: string, alert: Alert, config: AlertConfig }>();
    private _messages = new BehaviorSubject<Alert[]>([]);

    constructor(@Inject(ALERT_CONFIG) private config: AlertConfig) {

        if (!this.config) {
            this.config = {};
        }
        this.config.timeout = !!this.config.timeout ? this.config.timeout : 5000;
        this.config.maxMessages = !!this.config.maxMessages ? this.config.maxMessages : 5;


        this.dispatcher.scan(this.reducer, <Alert[]>[])
            .subscribe((state: Alert[]) => this._messages.next(state));
    }

    public get messages() {
        return this._messages;
    }

    public info(msg: string) {
        this.addAlert(this.createAlert(msg, 'info'));
    }

    public danger(msg: string) {
        this.addAlert(this.createAlert(msg, 'danger'));
    }

    public success(msg: string) {
        this.addAlert(this.createAlert(msg, 'success'));
    }

    public warning(msg: string) {
        this.addAlert(this.createAlert(msg, 'warning'));
    }

    private createAlert(msg: string, type: string): Alert {
        return {
            content: msg,
            type: type
        };
    }

    public close(alert: Alert) {
        this.dispatcher.next({type: 'DELETE', alert: alert, config: this.config});
    }

    private addAlert(alert: Alert) {
        this.dispatcher.next({type: 'ADD', alert: alert, config: this.config});

        Observable.interval(this.config.timeout).take(1).subscribe(() => {
            this.dispatcher.next({type: 'DELETE', alert: alert, config: this.config});
        });
    }

    private reducer(state: Alert[], action: { type: string, alert: Alert, config: AlertConfig }): Alert[] {
        if (action.type === 'ADD') {
            const output = [
                action.alert,
                ...state
            ];
            if (output.length > action.config.maxMessages) {
                output.pop();
            }
            return output;
        } else if (action.type === 'DELETE') {
            return state.filter(alert => alert !== action.alert)
        }
        return state;
    }
}
