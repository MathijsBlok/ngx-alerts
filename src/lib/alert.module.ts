import {ModuleWithProviders, NgModule} from '@angular/core';
import {AlertComponent} from './alert.component';
import {AlertService} from './alert.service';
import {CommonModule} from '@angular/common';
import {ALERT_CONFIG} from './alert.config';
import {AlertConfig} from './alert-config.model';

@NgModule({
    declarations: [
        AlertComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent
    ]
})
export class AlertModule {
    static forRoot(config?: AlertConfig): ModuleWithProviders {
        return {
            ngModule: AlertModule,
            providers: [
                AlertService,
                {provide: ALERT_CONFIG, useValue: config}
            ]
        };
    }
}
