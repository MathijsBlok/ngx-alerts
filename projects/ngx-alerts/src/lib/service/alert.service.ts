import {Inject, Injectable} from '@angular/core';
import {Alert} from '../model/alert.model';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {ALERT_CONFIG} from '../alert.config';
import {AlertConfig} from '../model/alert-config.model';
import {scan, take} from 'rxjs/internal/operators';
import {AlertReducer} from './alert.reducer';

@Injectable()
export class AlertService {

  private dispatcher = new Subject<{ fn: Function, alert: Alert, config: AlertConfig }>();
  private state = new BehaviorSubject<Alert[]>([]);

  constructor(@Inject(ALERT_CONFIG) private config: AlertConfig) {
    this.initConfig();
    this.dispatcher
      .pipe(
        scan(AlertReducer.reduce, [])
      )
      .subscribe(this.state);
  }

  private initConfig(): void {
    if (!this.config) {
      this.config = {};
    }
    this.config.timeout = !!this.config.timeout ? this.config.timeout : 5000;
    this.config.maxMessages = !!this.config.maxMessages ? this.config.maxMessages : 5;
  }

  public get messages(): Observable<Alert[]> {
    return this.state.asObservable();
  }

  public info(msg: string | { html: string }): void {
    this.addAlert({content: msg, type: 'info'});
  }

  public danger(msg: string | { html: string }): void {
    this.addAlert({content: msg, type: 'danger'});
  }

  public success(msg: string | { html: string }): void {
    this.addAlert({content: msg, type: 'success'});
  }

  public warning(msg: string | { html: string }): void {
    this.addAlert({content: msg, type: 'warning'});
  }

  public close(alert: Alert): void {
    this.dispatcher.next({fn: AlertReducer.remove, alert: alert, config: this.config});
  }

  private addAlert(alert: Alert): void {
    this.dispatcher.next({fn: AlertReducer.add, alert: alert, config: this.config});

    if (this.config.timeout > 0) {
      timer(this.config.timeout)
        .pipe(take(1))
        .subscribe(() => {
          this.dispatcher.next({fn: AlertReducer.remove, alert: alert, config: this.config});
        });
    }
  }
}
