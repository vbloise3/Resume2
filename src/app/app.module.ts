import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import 'rxjs/add/operator/map';
import { YoMoFoComponent } from './yo-mo-fo/yo-mo-fo';
import { AppComponent } from './appComponent/appComponent';
import { HomeComponent } from './home/home';
import { routing } from './app.routing';
import {MatButtonModule, MatCardModule, MatDialogModule, MatSnackBarModule, MatIconModule, MatDividerModule, MatRadioModule} from '@angular/material';
// import { MaterialModule } from '@angular/material';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import 'hammerjs/hammer.js';
import {Material2AppAppComponent, DialogContent} from './app.component/app.component';
import {PersonalInterestsComponent, DialogContent2} from './personalInterests.component/personalInterests.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestComponent } from './test/test.component';
import { PostsService } from './services/posts.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {C2pDynamoDbComponent} from './c2p-dynamo-db/c2p-dynamo-db.component';
import { DynamoDbserviceService } from './services/dynamo-dbservice';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { OnlyNumberDirective} from './directives/only-number.directive';
import { C2pQuestionComponent } from './c2p-question/c2p-question.component';

/*import {MyMaterialModule} from '../my-material.model';*/

// Define the routes
const appRoutes: Routes = [
  {
    path: 'tester',
    component: TestComponent
  },
  {
    path: 'c2padmin',
    component: C2pDynamoDbComponent
  },
  {
    path: 'c2ppractice',
    component: C2pQuestionComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '1',
    component: HomeComponent
  },
  {
    path: '2',
    component: PersonalInterestsComponent
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
    MatDividerModule,
    MatRadioModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )],
  declarations: [ AppComponent, HomeComponent, YoMoFoComponent, Material2AppAppComponent, DialogContent, PersonalInterestsComponent, DialogContent2, PageNotFoundComponent, TestComponent, C2pDynamoDbComponent, OnlyNumberDirective, C2pQuestionComponent],
  entryComponents: [DialogContent, DialogContent2],
  providers:    [PostsService, DynamoDbserviceService/*,
    {provide: LocationStrategy, useClass: HashLocationStrategy}*/],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
