import {inject, TestBed} from '@angular/core/testing';
import {AlertService} from './alert.service';
import {Alert} from '../model/alert.model';
import {ALERT_CONFIG} from '../alert.config';

describe('AlertService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AlertService,
                {provide: ALERT_CONFIG, useValue: {maxMessages: 5, timeout: 5000}}
            ]
        });
    });

    it('should be created', inject([AlertService], (service: AlertService) => {
        expect(service).toBeTruthy();
    }));

    it('should create info alert', inject([AlertService], (service: AlertService) => {
        const result: Alert = {
            content: 'info',
            type: 'info',
            alive: Observable.interval(5000).take(1)
        };

        service.message.subscribe(msg => {
            expect(msg).toEqual(result);
        });

        service.info('info');
    }));

    it('should create danger alert', inject([AlertService], (service: AlertService) => {
        const result: Alert = {
            content: 'danger',
            type: 'danger',
            alive: Observable.interval(5000).take(1)
        };

        service.message.subscribe(msg => {
            expect(msg).toEqual(result);
        });

        service.danger('danger');
    }));

    it('should create warning alert', inject([AlertService], (service: AlertService) => {
        const result: Alert = {
            content: 'warning',
            type: 'warning',
            alive: Observable.interval(5000).take(1)
        };

        service.message.subscribe(msg => {
            expect(msg).toEqual(result);
        });

        service.warning('warning');
    }));

    it('should create danger alert', inject([AlertService], (service: AlertService) => {
        const result: Alert = {
            content: 'danger',
            type: 'danger',
            alive: Observable.interval(5000).take(1)
        };

        service.message.subscribe(msg => {
            expect(msg).toEqual(result);
        });

        service.danger('danger');
    }));
});
