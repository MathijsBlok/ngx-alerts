import {Component, OnInit} from '@angular/core';
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
            'enterAnimation', [
                transition(':enter', [
                    style({transform: 'translateX(100%)', opacity: 0}),
                    animate('200ms', style({transform: 'translateX(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateX(0)', opacity: 1}),
                    animate('200ms', style({transform: 'translateX(100%)', opacity: 0.8}))
                ])
            ]
        )
    ]
})
export class AlertComponent implements OnInit {

    alerts: Alert[] = [];

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.startPoll();
        this.alertService.getMessage().subscribe(message => this.addAlert(message));
    }

    addAlert(alert: Alert) {
        if (this.alerts.length >= 5) {
            this.close(this.alerts.length - 1);
        }
        this.alerts.splice(0, 0, alert);
    }

    close(index: number) {
        this.alerts.splice(index, 1);
    }

    startPoll() {
        IntervalObservable.create(1000)
            .subscribe(() => this.alerts.forEach((a, i) => this.updateAlerts(a, i)));
    }

    updateAlerts(alert: Alert, index: number) {
        if (alert.alive >= 5) {
            this.close(index);
        }
        alert.alive++;
    }
}
