/**
 * Created by vincebloise on 12/22/16.
 */
import {Component} from '@angular/core';

@Component({
    selector: 'yo-mo-fo',
    templateUrl: './yo-mo-fo.html'
})
export class YoMoFoComponent {
    name: string;

    constructor() {
        this.name = 'mon vieux!';
    }
}
