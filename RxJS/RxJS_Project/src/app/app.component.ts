import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

interface Post {
  userId: number,
  id: number, 
  title: string,
  body: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.prueba.html', //'./app.component.html'
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  //title = 'RxJS_Project';

  data$!: Observable<Post>;
  private http = inject(HttpClient);

  constructor(){
    /* const observable = new Observable((subscriber)=>{
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
    });

    observable.subscribe({
      next(x){console.log(x)},
      error(err){console.log(err)},
      complete(){console.log("done")}
    }); */
  }

  ngOnInit(): void { 
    this.data$ = this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
  }
}
