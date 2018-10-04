import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {AlertService} from '../service/alert.service';
import {Alert} from '../model/alert.model';
import {trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {ALERT_CONFIG} from '../alert.config';
import {AlertConfig} from '../model/alert-config.model';
import {AnimationsUtil} from '../utils/animations.util';

@Component({
  selector: 'ngx-alerts',
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('animationRight', AnimationsUtil.animationDefinition('right')),
    trigger('animationLeft', AnimationsUtil.animationDefinition('left'))
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
