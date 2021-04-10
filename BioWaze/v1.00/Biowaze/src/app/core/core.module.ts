import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiMyPostsService } from '../services/api/api-my-posts.services';

//Using the newer HttpClientModule now. 
//This is the pre-Angular 4.3 Http option. If you're not on Angular 4.3 yet,
//simplify rename this file to core.module.ts to use it instead.

import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';


@NgModule({
  imports: [HttpClientModule],
  providers: [
    //Default XSRF provider setup (change cookie or header name if needed): 
    //{ provide: XSRFStrategy, useValue: new CookieXSRFStrategy('XSRF-TOKEN', 'X-XSRF-TOKEN') },
    ApiMyPostsService] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    //Ensure that CoreModule is only loaded into AppModule

  //Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}



