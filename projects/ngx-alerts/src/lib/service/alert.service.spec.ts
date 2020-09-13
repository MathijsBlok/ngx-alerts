import {inject, TestBed} from '@angular/core/testing';
import {AlertService} from './alert.service';
import {Alert} from '../model/alert.model';
import {AlertModule} from '../alert.module';
import {mergeMap, take, tap} from 'rxjs/operators';

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AlertModule.forRoot({maxMessages: 5})
      ]
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));

  it('should create info alert', inject([AlertService], (service: AlertService) => {
    const result: Alert[] = [{
      content: 'info',
      type: 'info'
    }];

    service.info('info');

    service.messages.pipe(take(1)).subscribe(msg => {
      expect(msg).toEqual(result);
    });
  }));

  it('should create success alert', inject([AlertService], (service: AlertService) => {
    const result: Alert[] = [{
      content: 'success',
      type: 'success'
    }];

    service.success('success');

    service.messages.pipe(take(1)).subscribe(msg => {
      expect(msg).toEqual(result);
    });
  }));

  it('should create warning alert', inject([AlertService], (service: AlertService) => {
    const result: Alert[] = [{
      content: 'warning',
      type: 'warning'
    }];

    service.warning('warning');

    service.messages.pipe(take(1)).subscribe(msg => {
      expect(msg).toEqual(result);
    });
  }));

  it('should create danger alert', inject([AlertService], (service: AlertService) => {
    const result: Alert[] = [{
      content: 'danger',
      type: 'danger'
    }];

    service.danger('danger');

    service.messages.pipe(take(1)).subscribe(msg => {
      expect(msg).toEqual(result);
    });
  }));

  it('should pop last alert', inject([AlertService], (service: AlertService) => {
    service.danger('danger');
    service.info('danger');
    service.warning('danger');
    service.success('danger');
    service.danger('danger');
    service.info('danger');
    service.warning('danger');
    service.success('danger');

    service.messages.pipe(take(1)).subscribe(msgs => {
      expect(msgs.length).toEqual(5);
    });
  }));

  it('should close alert', inject([AlertService], (service: AlertService) => {
    service.danger('danger');
    service.info('danger');
    service.warning('danger');
    service.success('danger');

    service.messages
      .pipe(
        take(1),
        tap(m => service.close(m[0])),
        mergeMap(() => service.messages)
      )
      .subscribe((msgs: Alert[]) => expect(msgs.length).toEqual(3));
  }));
});
