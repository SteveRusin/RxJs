Rx.Observable.fromPromise(fetch('https://jsonplaceholder.typicode.com/users'))
    .subscribe(
    (response) => {
        Rx.Observable.from(response.json())
            .map(users => users.map(user => user.name))
            .subscribe(
            result => console.log(result),
        );
    },
    (err) => console.error(err)
    )