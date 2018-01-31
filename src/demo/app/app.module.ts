import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AppRouterModule} from './app.routes';
import {PagesModule} from './pages/pages.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    PagesModule,
    AppRouterModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
