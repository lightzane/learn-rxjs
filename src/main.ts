
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

// of('Nat')
//     .pipe(
//         map((name) => `${name}!`),
//         tap((data) => console.log(`Last Christmas I wanted: ${data}`)),
//         switchMap((data) => of(`...that I still wanted ${data}`)),
//         map((data) => `But now I know ${data}`)
//     )
//     .subscribe(console.log);

const list = [
    {
        id: 1,
        name: 'John'
    },
    {
        id: 2,
        name: 'Nat'
    },
    {
        id: 3,
        name: 'IU'
    }
];

function getName(id: number): Observable<string | undefined> {
    return of(list.find((person) => person.id == id)?.name);
}

let id: number;
of(3, 2, 1, 1, 1)
    .pipe(
        tap((n) => id = n),
        switchMap((n) => getName(n)),
        map((n) => `${id}: ${n}`)
    )
    .subscribe(console.log);



