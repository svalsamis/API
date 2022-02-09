import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { SignalRConfiguration, SignalRModule } from 'ng2-signalr';
import { SignalRHelperService } from './core/services/signalR-helper.service';
import { AuthService } from './core/auth/auth.service';
import { LoadSettingsService } from './core/services/load-settings.service';
import { SigletonModule } from './core/sigleton.module';

const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy       : PreloadAllModules
};
export function createConfig(): SignalRConfiguration {
    const c = new SignalRConfiguration();
    c.hubName = 'eventhub';
    //c.qs = { user: 'donald' };
    c.url = 'http://localhost:64696/signalr';
    c.logging = true;
    
    // >= v5.0.0
    c.executeEventsInZone = true; // optional, default is true
    c.executeErrorsInZone = false; // optional, default is false
    c.executeStatusChangeInZone = true; // optional, default is true
    return c;
}
export function loadSettings(srv: LoadSettingsService) {
    return () => {
      srv.loadSettings();
    }
      
    
  }
@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        SigletonModule.forRoot(),
        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        SignalRModule.forRoot(createConfig),
        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({})
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [SignalRHelperService,
        {
            provide: APP_INITIALIZER, useFactory: loadSettings, deps: [LoadSettingsService], multi:true
        }
    ]
})
export class AppModule
{
}
