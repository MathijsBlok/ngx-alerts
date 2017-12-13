# ngx-alerts

### [Live demo](http://www.mathijsblok.com/alerts-demo)

## Installation

To install this library, run:

```bash
$ npm install ngx-alerts --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { AlertModule } from 'ngx-alerts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components and service in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<ngx-alerts></ngx-alerts>
```

```typescript
@Component({
    ...
})
export class AppComponent {

    constructor(private alertService: AlertService) {}
    
    showAlerts(): void{
        this.alertService.info('this is an info alert');
        this.alertService.danger('this is a danger alert');
        this.alertService.success('this is a success alert');
        this.alertService.warning('this is a warning alert');
    }    
}
```



Optional properties

* __maxMessages__ (Maximum number of message, default 5).
* __timeout__ (Time in milliseconds for messages to disappear automatically, default 5000).
 
 ```xml
 <ngx-alerts maxMessages="3" timeout="2000"></ngx-alerts>
 ````

## License

MIT © [Mathijs Blok](mailto:info@mathijsblok.com)
