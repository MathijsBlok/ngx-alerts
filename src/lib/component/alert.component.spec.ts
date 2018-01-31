import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {AlertService} from '../service/alert.service';
import {AlertComponent} from './alert.component';
import {Alert} from '../model/alert.model';
import 'rxjs/add/observable/of';
import {ALERT_CONFIG} from '../alert.config';

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
        const returnValue = Observable.of({});

        const getMessageSpy = spyOnProperty(alertService, 'message', 'get').and.returnValue(returnValue);
        const observableSpy = spyOn(returnValue, 'subscribe');

        component.ngOnInit();

        expect(getMessageSpy).toHaveBeenCalled();
        expect(observableSpy).toHaveBeenCalled();
    }));

    it('should add alert', () => {
        const alert: Alert = {
            content: 'danger',
            type: 'danger',
            alive: Observable.interval(5000).take(1)
        };
        component.addAlert(alert);
        expect(component.alerts).toEqual([alert]);
    });

    it('should add alert', () => {
        component.maxMessages = 1;
        component.alerts = [
            {
                content: 'danger',
                type: 'danger',
                alive: Observable.interval(5000).take(1)
            }
        ];
        const alert: Alert = {
            content: 'info',
            type: 'info',
            alive: Observable.interval(5000).take(1)
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
                alive: Observable.interval(5000).take(1)
            }
        ];
        component.close(0);
        expect(component.alerts).toEqual([]);
    });
});
