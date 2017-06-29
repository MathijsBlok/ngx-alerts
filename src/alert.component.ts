import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from './alert.service';
import {Alert} from './alert.class';
import {animate, style, transition, trigger} from '@angular/animations';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';

@Component({
    selector: 'ngx-alerts',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        trigger(
            'animation', [
                transition(':enter', [
                    style({transform: 'translateX(100%)', opacity: 0}),
                    animate('300ms 100ms ease', style({transform: 'translateX(0)', opacity: 0.8}))
                ]),
                transition(':leave', [
                    style({transform: 'translateX(0)', opacity: 0.8}),
                    animate('200ms ease-out', style({transform: 'translateX(100%)', opacity: 0}))
                ])
            ]
        )
    ]
})
export class AlertComponent implements OnInit {

    alerts: Alert[] = [];

    @Input()
    maxMessages = 5;

    @Input()
    timeout = 5000;

    @Input()
    fontAwesome = false;

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.startPoll();
        this.alertService.getMessage().subscribe(message => this.addAlert(message));
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
        IntervalObservable.create(10)
            .subscribe(() => this.alerts.forEach((alert, index) => this.updateAlerts(alert, index)));
    }

    updateAlerts(alert: Alert, index: number) {
        if (alert.alive >= (this.timeout / 10)) {
            this.close(index);
        }
        alert.alive++;
    }
}