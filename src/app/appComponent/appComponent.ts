/**
 * Created by vincebloise on 1/19/17.
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { Observable} from 'rxjs/Observable';

@Component({
    selector: 'http-client',
    templateUrl: './appComponent.html',
    styleUrls: ['./appComponent.css'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {}
