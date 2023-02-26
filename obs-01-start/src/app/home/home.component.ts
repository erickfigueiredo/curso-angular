import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    /*  this.firstObsSubscription = interval(1000).subscribe(count => {
       console.log(count)
     }); */

    const customInterval = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 6) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater tha 3!'));
        }
        count++;
      }, 1000)
    });

    this.firstObsSubscription = customInterval
      .pipe(
        filter((data:number) => {
          return data > 0;
        }),
        map((data: number) => { return 'Round: ' + (data + 1) }))
      .subscribe(count => {
        console.log(count)
      },
        error => {
          alert(error)
          console.log('The following error was caught: ' + error);
        },
        () => {
          console.log('Completed!');
          // Não precisa desinscrever mas se o fizer, sem problemas
          // Completed só acontece se não houver erro
        });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
