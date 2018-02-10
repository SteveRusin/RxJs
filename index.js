
const { of, create, interval, timeInterval } = Rx.Observable;

Rx.Observable.prototype.map = function (fn) {
    const source = this;

    return create(observer => {
        return source.subscribe(src => {
            observer.next(fn(src))
        })
    })
}

function addOne(x) {
    return x + 1;
}

const subscribtion = interval(1000)
    .take(Infinity)
    .map(x => x+5)


subscribtion.subscribe(data => {
    console.log(data)
})
