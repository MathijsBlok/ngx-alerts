import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../../lib/service/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.info('navigated to home');
  }

  notify(){
    this.alertService.danger('some message');
  }
}
