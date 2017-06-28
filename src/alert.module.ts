import {NgModule} from '@angular/core';
import {AlertComponent} from './alert.component';
import {AlertService} from './alert.service';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AlertComponent
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule
    ],
    providers: [
        AlertService
    ],
    exports: [
        AlertComponent
    ]
})
export class AlertModule {
}
