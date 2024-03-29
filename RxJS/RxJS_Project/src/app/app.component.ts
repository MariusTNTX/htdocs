import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.prueba.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /* Variable observable */
  obs:any;

  constructor() { }

  ngOnInit(): void {
    // Se crea un nuevo observable al cual se le pasa un subscriber (observer) para definir qué datos se van a recoger y cuando
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

  rxjsFun(){ //Al hacer click al botón se inicia la subscripción, donde se indica qué van a hacer los tres métodos básicos
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