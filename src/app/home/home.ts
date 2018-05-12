/**
 * Created by vincebloise on 1/19/17.
 */
import { Component, ViewEncapsulation, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient} from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/empty';
// import { Observable} from 'rxjs/Observable';
import { Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'http-client',
    templateUrl: './home.html',
    styleUrls: ['./home.css'],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements AfterViewInit {

    products: Observable<Array<string>>;
    errorMessage: string;
    productId: Number;
    randomness: Number;
    observer: MutationObserver;

    getRandomNumber(): number {
        return Math.random();
    }

    constructor(private elRef: ElementRef, private http: HttpClient, route: ActivatedRoute) {

        this.products = this.http.get('/products') as Observable<Array<string>>;
            /*.map(res => res.json())
            .catch( err => {
                this.errorMessage =`Can't get product details from ${err.url}, error ${err.status} `;
                return Observable.empty();
            });*/
        this.productId = route.snapshot.params['id'];
        this.randomness = this.getRandomNumber();
    }

  ngAfterViewInit() {
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function(mutation) {
        console.log('home.component mutation: ' + mutation.type + ' old value: ' + mutation.oldValue);
      });
    });
    const config = { attributes: true, childList: true, characterData: true };

    this.observer.observe(this.elRef.nativeElement, config);
  }
}
