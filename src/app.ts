import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {ScrollSpyService} from 'ng2-scrollspy';
import {AnimationService} from './app/services/animation.service';
import {RecipeApp} from './app/recipe-app.component';


// enableProdMode()

bootstrap(RecipeApp, [
  ScrollSpyService,
  AnimationService,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
])
.catch(err => console.error(err));
