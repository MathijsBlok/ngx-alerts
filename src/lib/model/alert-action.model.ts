import {Alert} from './alert.model';
import {AlertConfig} from './alert-config.model';

export interface AlertAction {
    alert: Alert;
    type: 'ADD' | 'DELETE';
    config: AlertConfig;
}