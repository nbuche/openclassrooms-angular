import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  secondes: number;
  counterSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    const counter = Observable.interval(1000);
    this.counterSubscription = counter.subscribe(
      (value: number) => {this.secondes = value; },
      (error: any) => {console.log('Une erreur a été rencontrée !'); },
      () => {console.log('Observable completé !'); }
    );
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}
