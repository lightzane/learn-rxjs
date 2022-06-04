import { from, of } from 'rxjs';
import { mergeMap, concatMap, switchMap, exhaustMap, delay, tap } from 'rxjs/operators';

let counter = 0;
const incrementCounter = () => { counter++; };

const of$ = of([1, 2, 3, 4, 5]);
of$
    .pipe(tap(incrementCounter))
    .subscribe({
        next: (data) => { console.log(data); },
        complete: () => console.log(`counter:`, counter) // => counter: 1
    });

counter = 0;
const from$ = from([1, 2, 3, 4, 5]);
from$
    .pipe(tap(incrementCounter))
    .subscribe({
        next: (data) => { console.log(data); },
        complete: () => { console.log(`counter:`, counter); } // => counter: 5
    });

// =====================================================
//  Flattening Operators
//  ? all are flattening the data into one observable
//
//  * mergeMap => no order, first come first serve
//  * concatMap => order is important
//  * switchMap => latest value only
//  * exhaustMap => first value only
// =====================================================

const getData = (param: number) => {
    const delayTime = Math.floor(Math.random() * 5000);
    return of(`the param is: ${param} and delay: ${delayTime} ms`).pipe(delay(delayTime));
};

// pick one flattening operators:
from([1, 2, 3, 4, 5]).pipe(
    // mergeMap((param) => getData(param)) // shorthand syntax: mergeMap(getData),
    concatMap(param => getData(param)) // concatMap(getData)
    // switchMap((param => getData(param))) // switchMap(getData)
    // exhaustMap(param => getData(param)) // exhaustMap(getData)
).subscribe(console.log);