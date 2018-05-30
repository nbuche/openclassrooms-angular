import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {

    appareilSubject = new Subject<any[]>();

    private appareils = [/*
        {
            id : 1,
          name: 'Machine à laver',
          status : 'allumé'
        },
        {
            id : 2,
          name: 'TV',
          status : 'allumé'
        },
        {
            id : 3,
          name: 'PC',
          status : 'éteint'
        }*/
      ];

      constructor(private httpClient: HttpClient) {}

      emitAppareilSubject() {
          this.appareilSubject.next(this.appareils.slice());
      }

      getAppareilById(id: number) {
          const appareil = this.appareils.find((appareilObject) => {
              return appareilObject.id === id;
          });

          return appareil;
      }

      switchOnAll() {
          for (const appareil of this.appareils) {
              appareil.status = 'allumé';
          }

          this.emitAppareilSubject();
      }

      switchOffAll() {
        for (const appareil of this.appareils) {
            appareil.status = 'éteint';
        }
        this.emitAppareilSubject();
    }

    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilSubject();
    }

    switchOffOne(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilSubject();
    }

    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };

        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;

        this.appareils.push(appareilObject);
        this.emitAppareilSubject();

    }

    saveAppareilToServer() {
        this.httpClient
        .put('https://http-client-demo-bead4.firebaseio.com/appareils.json', this.appareils)
        .subscribe( () => {
            console.log('Enregistrement terminé');
        },
        () => {
            console.log('Erreur enregistrement');
        });
    }

    getAppareilFromServer() {
        this.httpClient
        .get<any[]>('https://http-client-demo-bead4.firebaseio.com/appareils.json')
        .subscribe( (response) => {
            this.appareils = response;
            this.emitAppareilSubject();
        },
        (error) => {
            console.log('Erreur de recupération');
     });
    }
}
