import {Inject, Injectable} from '@angular/core';
import {Alert} from '../model/alert.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ALERT_CONFIG} from '../alert.config';
import {AlertConfig} from '../model/alert-config.model';
import 'rxjs/add/observable/interval';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AlertService {

    private timeout: number;
    private maxMessages: number;

    private dispatcher = new Subject<{type: string, alert: Alert}>();
    private _messages = new BehaviorSubject<Alert[]>([]);

    constructor(@Inject(ALERT_CONFIG) private config: AlertConfig) {
        this.timeout = !!this.config && !!this.config.timeout ? this.config.timeout : 5000;
        this.maxMessages = !!this.config && !!this.config.maxMessages ? this.config.maxMessages : 5;

        this.dispatcher.scan((state, action) => {
            if (action.type === 'ADD') {
                return [
                    ...state,
                    action.alert
                ]
            }else if(action.type === 'DELETE'){
                return state.filter(alert => alert !== action.alert)
            }
            return state;
        }, <Alert[]>[]).subscribe((state: Alert[]) => this._messages.next(state));
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
            type: type,
            alive: Observable.interval(this.timeout).take(1)
        };
    }

    private onTimeout(alert: Alert) {
        const index = this.state.indexOf(alert);
        if (index >= 0) {
            this.close(alert);
        }
    }

    public close(alert: Alert) {
        this.dispatcher.next({type: 'DELETE', alert: alert});
        // this.state.splice(index, 1);
        // this._messages.next(this.state);
    }

    private addAlert(alert: Alert) {
        this.dispatcher.next({type: 'ADD', alert: alert});

        Observable.interval(this.timeout).take(1).subscribe(() => {
            this.dispatcher.next({type: 'DELETE', alert: alert});
        });
        // alert.alive.subscribe(() => this.onTimeout(alert));
        //
        // if (this.state.length >= this.maxMessages) {
        //   this.close(this.state.length - 1);
        // }
        // this.state.splice(0, 0, alert);
        // this._messages.next(this.state);
    }
}
