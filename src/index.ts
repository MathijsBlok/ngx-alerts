import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertService} from './alert.service';

export * from './alert.component';
export * from './alert.service';

@NgModule({
    declarations: [
        AlertComponent
    ],
    imports: [
        BrowserAnimationsModule,
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

