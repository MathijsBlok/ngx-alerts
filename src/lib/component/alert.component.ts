import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../service/alert.service';
import {Alert} from '../model/alert.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import {Subscription} from 'rxjs/Subscription';
import {ALERT_CONFIG} from '../alert.config';
import {AlertConfig} from '../model/alert-config.model';

@Component({
    selector: 'ngx-alerts',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        trigger('animation', [
            state('shown', style({transform: 'translateX(0)', opacity: 0.8})),
            transition(':enter', [
                style({transform: 'translateX(100%)', opacity: 0}),
                animate('300ms 100ms ease', style({transform: 'translateX(0)', opacity: 0.8}))
            ]),
            transition(':leave', [
                style({transform: 'translateX(0)', opacity: 0.8}),
                animate('200ms ease-out', style({transform: 'translateX(100%)', opacity: 0}))
            ])]
        )
    ]
})
export class AlertComponent implements OnInit, OnDestroy {

    alerts: Alert[] = [];

    private maxMessages: number;
    private timeout: number;
    private subscriptions: Subscription[] = [];


    constructor(private alertService: AlertService,
                @Inject(ALERT_CONFIG) private config: AlertConfig) {
    }

    ngOnInit() {
        this.maxMessages = !!this.config && !!this.config.maxMessages ? this.config.maxMessages : 5;
        this.timeout = !!this.config && !!this.config.timeout ? this.config.timeout : 5000;

        this.startPoll();
        this.alertService.getMessage()
            .subscribe(message => this.addAlert(message));
    }

    ngOnDestroy(): void {
        this.subscriptions
            .forEach(subscription => subscription.unsubscribe());
    }

    addAlert(alert: Alert) {
        if (this.alerts.length >= this.maxMessages) {
            this.close(this.alerts.length - 1);
        }
        this.alerts.splice(0, 0, alert);
    }

    close(index: number) {
        this.alerts.splice(index, 1);
    }

    startPoll() {
        const sub = IntervalObservable.create(10)
            .subscribe(() => this.alerts.forEach((alert, index) => this.updateAlerts(alert, index)));
        this.subscriptions.push(sub);
    }

    updateAlerts(alert: Alert, index: number) {
        if (alert.alive >= (this.timeout / 10)) {
            this.close(index);
        }
        alert.alive++;
    }
}
