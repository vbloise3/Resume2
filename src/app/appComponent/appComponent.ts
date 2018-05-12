/**
 * Created by vincebloise on 1/19/17.
 */
import { Component, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/empty';
// import { Observable} from 'rxjs/Observable';
import { Observable} from 'rxjs';

@Component({
    selector: 'http-client',
    templateUrl: './appComponent.html',
    styleUrls: ['./appComponent.css'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewInit {
  observer: MutationObserver;

  constructor (private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function(mutation) {
        console.log('app.component mutation: ' + mutation.type + ' old value: ' + mutation.oldValue);
      });
    });
    const config = { attributes: true, childList: true, characterData: true };

    this.observer.observe(this.elRef.nativeElement, config);
  }
}
