import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { AuthService } from '../services/auth.service';
import { SubscriptionLog } from 'rxjs/testing/SubscriptionLog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  isAuth = false;

  lastUpdate = new Promise(
    (resolve, reject) => {
      const date = new Date();
      setTimeout(() => {
        resolve(date); }
      , 2000);
    }
  );
appareils: any[];
appareilsSubscription: Subscription;

  constructor(private apparareilService: AppareilService, private authService: AuthService ) {}

  onAllumer() {
    this.apparareilService.switchOnAll();
  }

  onEteindre() {
    this.apparareilService.switchOffAll();
  }

  ngOnInit() {
    this.appareilsSubscription = this.apparareilService.appareilSubject.subscribe((appareils: any[]) => {
      this.appareils = appareils;
    });
    this.apparareilService.emitAppareilSubject();
  }

  onSave() {
    this.apparareilService.saveAppareilToServer();
  }

  onFetch() {
    this.apparareilService.getAppareilFromServer();
  }

}
