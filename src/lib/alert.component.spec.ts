import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {AlertService} from './alert.service';
import {AlertComponent} from './alert.component';
import {Alert} from './alert.model';
import 'rxjs/add/observable/of';
import {ALERT_CONFIG} from './alert.config';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AlertComponent
            ],
            providers: [
                AlertService,
                {provide: ALERT_CONFIG, useValue: {}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should init', inject([AlertService], (alertService: AlertService) => {
        const startPollSpy = spyOn(component, 'startPoll');
        const getMessageSpy = spyOn(alertService, 'getMessage').and.returnValue(Observable.of({}));

        component.ngOnInit();

        expect(startPollSpy).toHaveBeenCalled();
        expect(getMessageSpy).toHaveBeenCalled();
    }));

    it('should add alert', () => {
        const alert: Alert = {
            content: 'danger',
            type: 'danger',
            alive: 0
        };
        component.addAlert(alert);
        expect(component.alerts).toEqual([alert]);
    });

    it('should add alert', () => {
        component['maxMessages'] = 1;
        component.alerts = [
            {
                content: 'danger',
                type: 'danger',
                alive: 0
            }
        ];
        const alert: Alert = {
            content: 'info',
            type: 'info',
            alive: 0
        };
        const closeSpy = spyOn(component, 'close').and.callThrough();

        component.addAlert(alert);

        expect(component.alerts).toEqual([alert]);
        expect(closeSpy).toHaveBeenCalledWith(0);
    });

    it('should close alert', () => {
        component.alerts = [
            {
                content: 'danger',
                type: 'danger',
                alive: 0
            }
        ];
        component.close(0);
        expect(component.alerts).toEqual([]);
    });

    it('should update timeout', () => {
        component.alerts = [
            {
                content: 'danger',
                type: 'danger',
                alive: 0
            }
        ];
        component.updateAlerts(component.alerts[0], 0);
        expect(component.alerts[0].alive).toEqual(1);
    });

    it('should update timeout and close', () => {
        component['timeout'] = 100;
        component['alerts'] = [
            {
                content: 'danger',
                type: 'danger',
                alive: 10
            }
        ];
        const closeSpy = spyOn(component, 'close').and.callThrough();

        component.updateAlerts(component.alerts[0], 0);
        expect(component.alerts).toEqual([]);
        expect(closeSpy).toHaveBeenCalled();
    });
});
