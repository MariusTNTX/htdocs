import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observables1',
  templateUrl: './observables1.component.html',
  styleUrls: ['./observables1.component.css']
})
export class Observables1Component implements OnInit {

  /* Variable observable */
  obs:any;

  constructor() { }

  ngOnInit(): void {
    /* Se crea un nuevo observable al cual se le pasa un subscriber (observer) */
    this.obs = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });
  }

  rxjsFun(){
    console.log('just before subscribe');
    this.obs.subscribe({
      next(x: any) {
        console.log('got value ' + x);
      },
      error(err: any) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
    console.log('just after subscribe');
  }
}
