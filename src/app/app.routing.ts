/**
 * Created by vincebloise on 1/24/17.
 */
import { Routes, RouterModule } from '@angular/router';
import { YoMoFoComponent } from './yo-mo-fo/yo-mo-fo';
import { HomeComponent } from './home/home';
import { PersonalInterestsComponent } from './personalInterests.component/personalInterests.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products/:id', component: HomeComponent},
    {path: 'yo', component: YoMoFoComponent},
    {path: 'dbaa', component: HomeComponent},
    {path: '1', component: HomeComponent},
    {path: 'personalInterests', component: PersonalInterestsComponent},
    {path: '2', component: PersonalInterestsComponent}
    ];

export const routing = RouterModule.forRoot(routes);
