
const { of, create, interval, timeInterval } = Rx.Observable;

Rx.Observable.prototype.map = function (source) {
    return this;

}

const subscribtion = interval(1000)
    .take(Infinity)
    .map(x => x)


subscribtion.subscribe(data => {
    console.log(data)
})
