# ngx-alerts

### [Live demo](https://demo.mathijsblok.com)

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

// Import BrowserAnimationsModule
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// Import your library
import { AlertModule } from 'ngx-alerts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,

    // Specify your library as an import (set timeout to -1 for unlimited timeout, the message can only be closed by the user clicking on it)
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Import library with optional config AlertConfig. Default values are maxMessages: 5, timeout: 5000, position: 'right'.
Where the timeout is in milliseconds, and the position cn be either left or right.
<br>

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
        // For normal messages
        this.alertService.info('this is an info alert');
        this.alertService.danger('this is a danger alert');
        this.alertService.success('this is a success alert');
        this.alertService.warning('this is a warning alert');
        
        // For html messages:
        this.alertService.warning({html: '<b>This message is bold</b>'});
    }    
}
```

## License

MIT © [Mathijs Blok](mailto:info@mathijsblok.com)
