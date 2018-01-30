import {NgModule} from '@angular/core';
import {AlertComponent} from './alert.component';
import {AlertService} from './alert.service';
import {CommonModule} from '@angular/common';

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
