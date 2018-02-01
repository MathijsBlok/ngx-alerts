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
import {AlertAction} from "../model/alert-action.model";

@Injectable()
export class AlertService {

  private dispatcher = new Subject<AlertAction>();
  private state = new BehaviorSubject<Alert[]>([]);

  constructor(@Inject(ALERT_CONFIG) private config: AlertConfig) {
    this.config = this.patchConfig(this.config);
    this.dispatcher.scan(this.reducer, []).subscribe(state => this.state.next(state));
  }

  public get messages(): Observable<Alert[]> {
    return this.state;
  }

  public info(msg: string): void {
    this.add({content: msg, type: 'info'});
  }

  public danger(msg: string): void {
    this.add({content: msg, type: 'danger'});
  }

  public success(msg: string): void {
    this.add({content: msg, type: 'success'});
  }

  public warning(msg: string): void {
    this.add({content: msg, type: 'warning'});
  }

  public close(alert: Alert): void {
    this.dispatcher.next({type: 'DELETE', alert: alert, config: this.config});
  }

  private patchConfig(config: AlertConfig): AlertConfig {
    return {
      timeout: 5000,
      maxMessages: 5,
      ...config
    };
  }

  private add(alert: Alert): void {
    this.dispatcher.next({type: 'ADD', alert: alert, config: this.config});

    Observable.interval(this.config.timeout).take(1).subscribe(() => {
      this.dispatcher.next({type: 'DELETE', alert: alert, config: this.config});
    });
  }

  private reducer(state: Alert[], action: AlertAction): Alert[] {
    if (action.type === 'ADD') {
      return [
        action.alert,
        ...state
      ].slice(0, action.config.maxMessages);
    } else if (action.type === 'DELETE') {
      return state.filter(alert => alert !== action.alert);
    }
    return state;
  }
}
