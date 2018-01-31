import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../../../lib/service/alert.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
    }

    danger() {
        this.alertService.danger('some message');
    }

    info() {
        this.alertService.info('some message');
    }

    success() {
        this.alertService.success('some message');
    }

    warning() {
        this.alertService.warning('some message');
    }

}
