import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {AlertService} from '../service/alert.service';
import {AlertComponent} from './alert.component';
import {Alert} from '../model/alert.model';
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
        const returnValue = of([]);
        const getMessageSpy = spyOnProperty(alertService, 'messages', 'get').and.returnValue(returnValue);

        component.ngOnInit();

        expect(getMessageSpy).toHaveBeenCalled();
        expect(component.alerts).toEqual(returnValue);
    }));

    it('should close', inject([AlertService], (alertService: AlertService) => {
        const closeSpy = spyOn(alertService, 'close');
        const alert: Alert = {
            content: 'content',
            type: 'danger'
        };
        component.close(alert);

        expect(closeSpy).toHaveBeenCalledWith(alert);
    }));
});
