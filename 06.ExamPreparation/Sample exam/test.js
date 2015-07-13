var music = (function () {
    var _nextSongId = 1;
    var song = (function () {
        var song = {};
        Object.defineProperties(song, {
            id: {
                get: function () {
                    return this._id;
                },

                set: function (value) {
                    if(!this.id) {
                        this._id = value;
                    }
                }
            },

            init: {
                value: function (name) {
                    this.name = name;
                    this.id = _nextSongId;
                    _nextSongId += 1;
                    return this;
                }
            }
        });

        return song;
    }());

    return {
        getSong: function (name) {
            return Object.create(song).init(name);
        }
    }
}());

var pesho = music.getSong('pesho'),
    gosho = music.getSong('gosho');

pesho.id = 777;

console.log(pesho);
console.log(gosho);