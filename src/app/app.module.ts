import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import 'rxjs/add/operator/map';
import { YoMoFoComponent } from './yo-mo-fo/yo-mo-fo';
import { AppComponent } from './appComponent/appComponent';
import { HomeComponent } from './home/home';
import { routing } from './app.routing';
import {MatButtonModule, MatCardModule, MatDialogModule, MatSnackBarModule, MatIconModule} from '@angular/material';
// import { MaterialModule } from '@angular/material';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import 'hammerjs/hammer.js';
import {Material2AppAppComponent, DialogContent} from './app.component/app.component';
import {PersonalInterestsComponent, DialogContent2} from './personalInterests.component/personalInterests.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestComponent } from './test/test.component';
import { PostsService } from './services/posts.service';
/*import {MyMaterialModule} from '../my-material.model';*/

// Define the routes
const appRoutes: Routes = [
  {
    path: 'tester',
    component: TestComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, RouterModule,
    HttpClientModule, routing, MatSidenavModule, MatDialogModule, MatSnackBarModule, MatIconModule, MatCardModule, MatToolbarModule, BrowserAnimationsModule, MatButtonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )],
  declarations: [ AppComponent, HomeComponent, YoMoFoComponent, Material2AppAppComponent, DialogContent, PersonalInterestsComponent, DialogContent2, PageNotFoundComponent, TestComponent],
  entryComponents: [DialogContent, DialogContent2],
  providers:    [PostsService/*,
    {provide: LocationStrategy, useClass: HashLocationStrategy}*/],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
