/**
 * Created by vincebloise on 3/20/17.
 */

import {Component, Optional, ViewEncapsulation, ElementRef, AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar, MatSidenav} from '@angular/material';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/empty';
// import { Observable} from "rxjs/Observable";
import { Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router, Routes, RouterModule } from '@angular/router';

@Component({
    selector: 'personal-interests',
    templateUrl: './personalInterests.component.html',
    styleUrls: ['./personalInterests.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PersonalInterestsComponent implements AfterViewInit {
    isDarkTheme: boolean = false;
    lastDialogResult: string;
    myEmail: string = 'vbloise3@gmail.com';

    products: Observable<Array<string>>;
    errorMessage: string;
    productId: Number;
    randomness: Number;
    selected = '';
    currentPath = '';
    observer: MutationObserver;

    getRandomNumber(): number {
        return Math.random();
    }

    select(text: string) {
        this.selected = text;
        this.lastDialogResult = text;
    }

    foods: any[] = [
        {name: 'Pizza', rating: 'Excellent'},
        {name: 'Burritos', rating: 'Great'},
        {name: 'French fries', rating: 'Pretty good'},
    ];

    progress: number = 0;

    constructor(private _dialog: MatDialog, private elRef: ElementRef, private _snackbar: MatSnackBar, private http: HttpClient, route: ActivatedRoute, private _router: Router ) {
        this.products = this.http.get('/products')  as Observable<Array<string>>;
            /*.map(res => res.json())
            .catch( err => {
                this.errorMessage =`Can't get product details from ${err.url}, error ${err.status} `;
                return Observable.empty();
            });*/
        this.productId = route.snapshot.params['id'];
        this.randomness = this.getRandomNumber();
        this.currentPath = this._router.url;
        // Update the value for the progress-bar on an interval.
        setInterval(() => {
            this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
        }, 200);
    }

    getCurrentPath() {
        if (this.currentPath === '/')
            return true;
        else
            return false;
    }

    openDialog() {
        let dialogRef = this._dialog.open(DialogContent2);

        dialogRef.afterClosed().subscribe(result => {
            this.lastDialogResult = result;
        })
    }

    showSnackbar() {
        this._snackbar.open('YUM SNACKS', 'CHEW');
    }

    sendEmail() {
        window.open('mailto:' + this.myEmail + '?subject=Resume&body=Contacting you about your resume.', '_blank', 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=100000, top=100000, width=1, height=1, visible=none');
    }

    navigateToHome() {
        this._router.navigate(["/"]);
        //this._mdsidenav.close();
    }

  ngAfterViewInit() {
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function(mutation) {
        console.log('personalInterests.component mutation: ' + mutation.type + ' old value: ' + mutation.oldValue);
      });
    });
    const config = { attributes: true, childList: true, characterData: true };

    this.observer.observe(this.elRef.nativeElement, config);
  }
}


@Component({
    template: `
    <!--div id="container" class="centerIt"-->
        <mat-toolbar color="primary" style="height: 3.15em; width: 114%; margin-left: -1em; margin-top: -1em;">            
            <img class="mdCardSmallDialogImg transparentProfilePic">
            <span id="center" class="textBottom largeFont" style="width: 50%; margin-left: -1em;">&nbsp;My Contact Info</span>            
        </mat-toolbar>
    <!--/div-->
    <table>
        <tr>
          <td><a href="mailto:vbloise3@gmail.com?Subject=Resume" style="color: blue;"><i class="material-icons md-18 iconBottom">email</i>vbloise3@gmail.com</a></td>
          <td><a href="tel:484-433-3269" style="color: blue"><i class="material-icons md-18 iconBottom">phone_iphone</i>484-433-3269</a></td>
        </tr>
    </table>
    <div class="centerIt2">
        <button mat-raised-button (click)="dialogRef.close('done')">Done</button>
    </div>
  `,
})
export class DialogContent2 {
    constructor(@Optional() public dialogRef: MatDialogRef<DialogContent2>) { }
}
