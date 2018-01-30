import {inject, TestBed} from '@angular/core/testing';
import {AlertService} from './alert.service';
import {Alert} from './alert.model';

describe('AlertService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AlertService
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
            alive: 0
        };

        service.getMessage().subscribe(msg => {
            expect(msg).toEqual(result);
        });

        service.info('info');
    }));

    it('should create danger alert', inject([AlertService], (service: AlertService) => {
        const result: Alert = {
            content: 'danger',
            type: 'danger',
            alive: 0
        };

        service.getMessage().subscribe(msg => {
            expect(msg).toEqual(result);
        });

        service.danger('danger');
    }));

    it('should create warning alert', inject([AlertService], (service: AlertService) => {
        const result: Alert = {
            content: 'warning',
            type: 'warning',
            alive: 0
        };

        service.getMessage().subscribe(msg => {
            expect(msg).toEqual(result);
        });

        service.warning('warning');
    }));

    it('should create danger alert', inject([AlertService], (service: AlertService) => {
        const result: Alert = {
            content: 'danger',
            type: 'danger',
            alive: 0
        };

        service.getMessage().subscribe(msg => {
            expect(msg).toEqual(result);
        });

        service.danger('danger');
    }));
});
