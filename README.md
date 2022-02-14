# learn-rxjs

![](https://img.shields.io/badge/rxjs-6.5.4-ff69b4) ![](https://img.shields.io/badge/typescript-4.5.4-blue)

Learning [RxJS](https://rxjs.dev) written in Typescript

This main branch is for `Subjects` concept of `RxJS`.

See other branch to check other concepts.

### Contents for this Branch

1. [Observable](#observable)
2. [Subject](#subject)
3. [BehaviorSubject](#behavior-subject)
4. [ReplaySubject](#replay-subject)
5. [AsyncSubject](#async-subject)

## Observable

```ts
// * Observables are UNICAST
const observable$ = new Observable<number>((subs) => subs.next(Math.random()));
// Subscriber 1
observable$.subscribe(console.log); // => 0.41313804548289257
// Subscriber 2
observable$.subscribe(console.log); // => 0.09685619724245242
```

## Subject

Subject only return values to the ones already subscribed.

Once value is emitted, it will not display values to late subscribers.

**Sample 1**

```ts
// * Subjects are MULTICAST (and has access to next() - where you can actively emit the event)
const subject$ = new Subject<number>();
// Subscriber 1
subject$.subscribe(console.log); // => 0.10645350583338242
// Subscriber 2
subject$.subscribe(console.log); // => 0.10645350583338242

subject$.next(Math.random());

// Subscriber 3
subject$.subscribe(console.log); // => (returns nothing)
```

**Sample 2**

```ts
// Subscriber 1
subject$.subscribe(console.log); // => 0.10645350583338242, 123
// Subscriber 2
subject$.subscribe(console.log); // => 0.10645350583338242, 123

subject$.next(Math.random());

// Subscriber 3
subject$.subscribe(console.log); // => 123

subject$.next(123);
```

## Behavior Subject

It requires an initial value and will display that value even to late subscribers.

```ts
const bs$ = new BehaviorSubject<number>(123);
bs$.subscribe(console.log); // => 123, 200
bs$.next(200);
bs$.subscribe(console.log); // => 200
```

## Replay Subject

Does not require an initial value.
When no buffer value is provided, it will display all the value to late subscribers.

**Example 1: Replay All**

```ts
const rs1$ = new ReplaySubject<string>();
rs1$.next('What a bright time');
rs1$.next('It is the right time');
rs1$.next('To rock the night away');
rs1$.subscribe(console.log); // => (will display all the previous lines)
```

**Example 2: Replay last 2 lines**

```ts
const rs1$ = new ReplaySubject<string>(2);
rs1$.next('What a bright time');
rs1$.next('It is the right time');
rs1$.next('To rock the night away');
rs1$.subscribe(console.log); // => (will display the last previous 2 lines)
```

**Example 3: Replay last 2 lines and display newly emitted values**

```ts
const rs1$ = new ReplaySubject<string>(2);
rs1$.next('What a bright time');
rs1$.next('It is the right time');
rs1$.next('To rock the night away');
rs1$.subscribe(console.log); // => (will display the last previous 2 lines) + (the new emitted values in future)
rs1$.next('Jingle bell time is a swell time');
rs1$.next('To go glidin in a one-horse sleigh');
rs1$.subscribe(console.log); // => (will display the last previous 2 lines)
```

## Async Subject

Does not require initial value.

Will only emit **last** value when `.complete()` is called **and will NOT emit new values even if another** `.complete()` **is called**

```ts
console.log('AsyncSubject - Stream not yet Completed');
const test0$ = new AsyncSubject();
test0$.next(1);
test0$.next(2);
test0$.subscribe(console.log); // (returns nothing)

console.log('AsyncSubject - Stream completed before subscribing');
const test1$ = new AsyncSubject();
test1$.next(1);
test1$.next(2);
test1$.complete();
test1$.subscribe(console.log); // => 2

console.log(
  'AsyncSubject - Stream completed before subscribing and new stream is emitted and completed',
);
const test2$ = new AsyncSubject();
test2$.next(1);
test2$.next(2);
test2$.complete();
test2$.subscribe(console.log); // => 2

test2$.next(3);
test2$.next(4);
test2$.complete();

console.log('AsyncSubject - Subscribed BEFORE stream is Completed');
const test3$ = new AsyncSubject();
test3$.next(1);
test3$.next(2);
test3$.subscribe(console.log); // => 2
test3$.complete();

test3$.next(3);
test3$.next(4);
test3$.complete();

test3$.subscribe(console.log); // => 2
```
