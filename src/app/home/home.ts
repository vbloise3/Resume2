/**
 * Created by vincebloise on 1/19/17.
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { Observable} from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'http-client',
    templateUrl: './home.html',
    styleUrls: ['./home.css'],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent {

    products: Observable<Array<string>>;
    errorMessage: string;
    productId: Number;
    randomness: Number;

    getRandomNumber(): number {
        return Math.random();
    }

    constructor(private http: HttpClient, route: ActivatedRoute) {

        this.products = this.http.get('/products') as Observable<Array<string>>;
            /*.map(res => res.json())
            .catch( err => {
                this.errorMessage =`Can't get product details from ${err.url}, error ${err.status} `;
                return Observable.empty();
            });*/
        this.productId = route.snapshot.params['id'];
        this.randomness = this.getRandomNumber();
    }
}
