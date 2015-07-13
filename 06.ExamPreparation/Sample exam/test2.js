var pesho = 5;
var gosho = (function () {
    var _secret = pesho;
    pesho += 1;
    var obj = {};
    Object.defineProperty(obj, 'x', {
        value: _secret
    });

    return obj;
});

var stamat = Object.create(gosho);
console.log(stamat.x);