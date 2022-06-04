# learn-rxjs

![](https://img.shields.io/badge/rxjs-6.5.4-ff69b4) ![](https://img.shields.io/badge/typescript-4.5.4-blue)

Learning [RxJS](https://rxjs.dev) written in Typescript

# Flattening Operators

All are flattening the data into one observable

* `mergeMap` => no order, first come first serve
* `concatMap` => order is important
* `switchMap` => latest value only
* `exhaustMap` => first value only

```ts
const getData = (param: number) => {
    const delayTime = Math.floor(Math.random() * 5000);
    return of(`the param is: ${param} and delay: ${delayTime} ms`).pipe(delay(delayTime));
};

// pick one flattening operators:
from([1, 2, 3, 4, 5]).pipe(
    // mergeMap((param) => getData(param)) // shorthand syntax: mergeMap(getData),
    concatMap(param => getData(param)) // concatMap(getData)
    // switchMap((param=>getData(param))) // switchMap(getData)
    // exhaustMap(param => getData(param)) // exhaustMap(getData)
).subscribe(console.log);
```

**mergeMap result**

```
the param is: 1 and delay: 1307 ms
the param is: 2 and delay: 1603 ms
the param is: 5 and delay: 1681 ms
the param is: 4 and delay: 2310 ms
the param is: 3 and delay: 3984 ms
```

**concatMap result**

```
the param is: 1 and delay: 1295 ms
the param is: 2 and delay: 4731 ms
the param is: 3 and delay: 1077 ms
the param is: 4 and delay: 4649 ms
the param is: 5 and delay: 597 ms
```

**switchMap result**

```
the param is: 5 and delay: 1353 ms
```

**exhaustMap result**

```
the param is: 1 and delay: 2797 ms
```


# of vs from

As you noticed, instead using `of()`, we used `from( [1, 2, 3, 4, 5] )` to test the differences among the 4 flattening operators of `RxJS`. 

> Why? Please see below comparison:

```ts
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
```