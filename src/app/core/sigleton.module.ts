import { ModuleWithProviders, NgModule } from '@angular/core';

import { GlobalService } from './services/global-service.service';
@NgModule({})
export class SigletonModule { 
    
    public static forRoot(): ModuleWithProviders<SigletonModule> {
        return {
            ngModule: SigletonModule,
            providers: [
                GlobalService
                
            ]
        };
    }
}