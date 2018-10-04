import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {AlertService} from '../service/alert.service';
import {Alert} from '../model/alert.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {ALERT_CONFIG} from '../alert.config';
import {AlertConfig} from '../model/alert-config.model';

@Component({
  selector: 'ngx-alerts',
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('animationRight', [
      state('shown', style({transform: 'translateX(0)', opacity: 0.8})),
      transition(':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('300ms 100ms ease', style({transform: 'translateX(0)', opacity: 0.8}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 0.8}),
        animate('200ms ease-out', style({transform: 'translateX(100%)', opacity: 0}))
      ])]
    ),
    trigger('animationLeft', [
      state('shown', style({transform: 'translateX(0)', opacity: 0.8})),
      transition(':enter', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate('300ms 100ms ease', style({transform: 'translateX(0)', opacity: 0.8}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 0.8}),
        animate('200ms ease-out', style({transform: 'translateX(-100%)', opacity: 0}))
      ])]
    )
  ]
})
export class AlertComponent implements OnInit {

  alerts: Observable<Alert[]>;

  constructor(
    @Inject(ALERT_CONFIG) private config: AlertConfig,
    private alertService: AlertService) {
    this.initConfig();
  }

  ngOnInit() {
    this.alerts = this.alertService.messages;
  }

  close(alert: Alert) {
    this.alertService.close(alert);
  }

  get position() {
    return this.config.position;
  }

  private initConfig(): void {
    if (!this.config) {
      this.config = {};
    }
    this.config.position = !!this.config.position ? this.config.position : 'right';
  }
}
