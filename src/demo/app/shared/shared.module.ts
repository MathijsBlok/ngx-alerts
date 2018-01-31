import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {AlertModule} from '../../../lib/alert.module';

@NgModule({
  imports: [
    CommonModule,
    AlertModule
  ],
  exports: [
    CommonModule,
    AlertModule
  ]
})
export class SharedModule { }
