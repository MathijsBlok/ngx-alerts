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
export class AlertComponent implements OnInit {

    alerts: Alert[] = [];

    private maxMessages: number;

    constructor(private alertService: AlertService,
                @Inject(ALERT_CONFIG) private config: AlertConfig) {
    }

    ngOnInit() {
        this.alertService.message
            .subscribe(message => this.addAlert(message));
    }

    addAlert(alert: Alert) {
        alert.alive.subscribe(() => this.onTimeout(alert));

        if (this.alerts.length >= this.maxMessages) {
            this.close(this.alerts.length - 1);
        }
        this.alerts.splice(0, 0, alert);
    }

    close(index: number) {
        this.alerts.splice(index, 1);
    }

    private onTimeout(alert: Alert){
        const index = this.alerts.indexOf(alert);
        if(index >= 0){
            this.close(index);
        }
    }
}
