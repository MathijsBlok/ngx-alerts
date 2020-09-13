import {AlertConfig} from '../model/alert-config.model';
import {Alert} from '../model/alert.model';

// @dynamic
export class AlertReducer {

  public static reduce(state: Alert[], action: { fn: Function, alert: Alert, config: AlertConfig }): Alert[] {
    return action.fn(state, {alert: action.alert, config: action.config});
  }

  public static add(state: Alert[], params: { alert: Alert, config: AlertConfig }): Alert[] {
    const output = [
      params.alert,
      ...(params.config.positionY === 'top' ? state : state.reverse())
    ];
    if (output.length > params.config.maxMessages) {
      output.pop();
    }
    return params.config.positionY === 'top' ? output : output.reverse();
  }

  public static remove(state: Alert[], params: { alert: Alert, config: AlertConfig }): Alert[] {
    return state.filter(alert => alert !== params.alert);
  }
}
