import {Inject, Injectable} from '@angular/core';
import {Alert} from '../model/alert.model';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {ALERT_CONFIG} from '../alert.config';
import {AlertConfig} from '../model/alert-config.model';
import {scan, take} from 'rxjs/internal/operators';

@Injectable()
export class AlertService {

  private dispatcher = new Subject<{ type: 'ADD' | 'DELETE', alert: Alert, config: AlertConfig }>();
  private state = new BehaviorSubject<Alert[]>([]);

  constructor(@Inject(ALERT_CONFIG) private config: AlertConfig) {
    this.initConfig();
    this.dispatcher.pipe(scan(this.reducer, []))
      .subscribe((state: Alert[]) => this.state.next(state));
  }

  private initConfig(): void {
    if (!this.config) {
      this.config = {};
    }
    this.config.timeout = !!this.config.timeout ? this.config.timeout : 5000;
    this.config.maxMessages = !!this.config.maxMessages ? this.config.maxMessages : 5;
  }

  public get messages(): Observable<Alert[]> {
    return this.state;
  }

  public info(msg: string): void {
    this.addAlert({content: msg, type: 'info'});
  }

  public danger(msg: string): void {
    this.addAlert({content: msg, type: 'danger'});
  }

  public success(msg: string): void {
    this.addAlert({content: msg, type: 'success'});
  }

  public warning(msg: string): void {
    this.addAlert({content: msg, type: 'warning'});
  }

  public close(alert: Alert): void {
    this.dispatcher.next({type: 'DELETE', alert: alert, config: this.config});
  }

  private addAlert(alert: Alert): void {
    this.dispatcher.next({type: 'ADD', alert: alert, config: this.config});

    timer(this.config.timeout)
      .pipe(take(1))
      .subscribe(() => {
        this.dispatcher.next({type: 'DELETE', alert: alert, config: this.config});
      });
  }

  private reducer(state: Alert[], action: { type: 'ADD' | 'DELETE', alert: Alert, config: AlertConfig }): Alert[] {
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
      return state.filter(alert => alert !== action.alert);
    }
    return state;
  }
}
