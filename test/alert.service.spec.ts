import {inject, TestBed} from '@angular/core/testing';
import {AlertService} from '../src/alert.service';
import Jasmine = jasmine.Jasmine;
import {Subject} from 'rxjs/Subject';
import {Alert} from '../src/alert.class';

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
        const doTest: Subject<boolean> = new Subject<boolean>();

        service.getMessage().subscribe(msg => {
            doTest.subscribe(() => {
                expect(msg).toEqual(result);
            });
        });

        service.info('info');
        doTest.next(true);
    }));

    it('should create danger alert', inject([AlertService], (service: AlertService) => {
        const result: Alert = {
            content: 'danger',
            type: 'danger',
            alive: 0
        };
        const doTest: Subject<boolean> = new Subject<boolean>();

        service.getMessage().subscribe(msg => {
            doTest.subscribe(() => {
                expect(msg).toEqual(result);
            });
        });

        service.danger('danger');
        doTest.next(true);
    }));

    it('should create warning alert', inject([AlertService], (service: AlertService) => {
        const result: Alert = {
            content: 'warning',
            type: 'warning',
            alive: 0
        };
        const doTest: Subject<boolean> = new Subject<boolean>();

        service.getMessage().subscribe(msg => {
            doTest.subscribe(() => {
                expect(msg).toEqual(result);
            });
        });

        service.warning('warning');
        doTest.next(true);
    }));

    it('should create danger alert', inject([AlertService], (service: AlertService) => {
        const result: Alert = {
            content: 'danger',
            type: 'danger',
            alive: 0
        };
        const doTest: Subject<boolean> = new Subject<boolean>();

        service.getMessage().subscribe(msg => {
            doTest.subscribe(() => {
                expect(msg).toEqual(result);
            });
        });

        service.danger('danger');
        doTest.next(true);
    }));
});
