import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routesConfig } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  ...appConfig, 
  providers: [
    provideRouter(routesConfig),
    provideHttpClient(),
    provideAnimationsAsync(), 
    provideToastr(),
  ]
}).catch((err) => console.error(err));
