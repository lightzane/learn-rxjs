import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
// import { ajax } from "rxjs/ajax";

// * Observables are UNICAST
console.log('Observable');
const observable$ = new Observable<number>((subs) => subs.next(Math.random()));
// Subscriber 1
observable$.subscribe(console.log); // => 0.41313804548289257
// Subscriber 2
observable$.subscribe(console.log); // => 0.09685619724245242


// * Subjects are MULTICAST (and has access to next() - where you can actively emit the event)
console.log('Subject');
const subject$ = new Subject<number>();
// Subscriber 1
subject$.subscribe(console.log); // => 0.10645350583338242, 123
// Subscriber 2
subject$.subscribe(console.log); // => 0.10645350583338242, 123

subject$.next(Math.random());

// Subscriber 3
subject$.subscribe((d) => console.log(`Subs 3: ${d}`)); // => 123

subject$.next(123);

// ** This can be only Tested within a Browser
// Subjects can allow 1 API call ====================================================================
// Also Subjects can be a data consumer
//
// const caller = new Subject();
// const data = ajax('https://jsonplaceholder.typicode.com/users');

// data.subscribe(console.log); --> will produce 1st API call
// data.subscribe(console.log); --> will produce 2nd API call

// caller.subscribe();
// caller.subscribe();
// data.subscribe(caller); -- will produce 1st API call
// ====================================================================


// * Behavior Subject
console.log('BehaviorSubject');
const bs$ = new BehaviorSubject<number>(123);
// Subscriber 1
bs$.subscribe(console.log); // => 123, 200
bs$.next(200);
// Subscriber 2
bs$.subscribe(console.log); // => 200

// * Replay Subject
console.log('ReplaySubject - ALL');
const rs1$ = new ReplaySubject<string>();
rs1$.next('What a bright time');
rs1$.next('It is the right time');
rs1$.next('To rock the night away');
// Subscriber 1
rs1$.subscribe(console.log); // => (will display all the previous lines)

console.log('ReplaySubject -- bufferSize: 2');
const rs2$ = new ReplaySubject(2);
rs2$.next('What a bright time');
rs2$.next('It is the right time');
rs2$.next('To rock the night away');
// Subscriber 1
rs2$.subscribe(console.log); // => (will display the last previous 2 lines) + (the new emitted values in future)
rs2$.next('Jingle bell time is a swell time');
rs2$.next('To go glidin in a one-horse sleigh');
// Subscriber 2
rs2$.subscribe((d) => console.log('Sub2: ' + d)); // => (will display the last previous 2 lines)

// * Async Subject
console.log('AsyncSubject - Stream not yet Completed');
const test0$ = new AsyncSubject();
test0$.next(1);
test0$.next(2);
// Subscriber 1
test0$.subscribe(console.log); // (returns nothing)

console.log('AsyncSubject - Stream completed before subscribing');
const test1$ = new AsyncSubject();
test1$.next(1);
test1$.next(2);
test1$.complete();
// Subscriber 1
test1$.subscribe(console.log); // => 2

console.log('AsyncSubject - Stream completed before subscribing and new stream is emitted and completed');
const test2$ = new AsyncSubject();
test2$.next(1);
test2$.next(2);
test2$.complete();
// Subscriber 1
test2$.subscribe(console.log); // => 2

test2$.next(3);
test2$.next(4);
test2$.complete();

console.log('AsyncSubject - Subscribed BEFORE stream is Completed');
const test3$ = new AsyncSubject();
test3$.next(1);
test3$.next(2);
// Subscriber 1
test3$.subscribe(console.log); // => 2
test3$.complete();

test3$.next(3);
test3$.next(4);
test3$.complete();
// Subscriber 2
test3$.subscribe(console.log); // => 2