import {NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertModule} from '../../../projects/ngx-alerts/src/lib/alert.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AlertModule.forRoot({position: 'left'})
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
