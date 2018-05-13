import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AlertService} from '../service/alert.service';
import {Alert} from '../model/alert.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs';

@Component({
    selector: 'ngx-alerts',
    templateUrl: './alert.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    alerts: Observable<Alert[]>;

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.alerts = this.alertService.messages;
    }

    close(alert: Alert) {
        this.alertService.close(alert);
    }
}
