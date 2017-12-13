import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert.component';
import {AlertService} from './alert.service';

export * from './alert.component';
export * from './alert.service';

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
    static forRoot() {
        return {
            ngModule: AlertModule,
            providers: [
                AlertService
            ]
        };
    }
}

