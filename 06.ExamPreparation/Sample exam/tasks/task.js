
function solve() {
    var CONSTS = {
        PLAYER: {
            MIN_LENGTH: 3,
            MAX_LENGTH: 30
        }
    },
        validNameCharacters = 'qwertyuiopasdfghjklzxcvbnm' + 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase() + ' \'"-_.,1234567890!*',
        players,
        playlists;
    function isNameValid(name, min, max) {
        var result = typeof (name) === 'string' &&
            min <= name.length && name.length <= max &&
            name.split('').every(function (ch) {
                return validNameCharacters.indexOf(ch) >= 0;
            });
        return result;
    }
    playlists = (function () {
        var _audios = [],
            nextAudioId = 1;
        var playlist = {
            init: function (name) {
                this.name = name;
                return this;
            },

            addAudio: function (audio) {
                for(var i = 0, len = _audios.length; i < len; i += 1) {
                    var currentAudio = _audios[i];
                    if(audio.name === currentAudio.name) {
                        _audios.push({
                            id: currentAudio.id,
                            name: audio.name
                        });

                        return this;
                    }
                }
                _audios.push({
                    id: nextAudioId,
                    name: audio.name
                });

                nextAudioId += 1;

                return this;
            },

            getAudioById: function (id) {
                var matchedAudios = _audios.filter(function (item) {
                    return item.id === id;
                });

                if(matchedAudios.length === 0) {
                    return null;
                }

                return matchedAudios[0];
            },

            removeAudioById: function (id) {
                for(var i = 0, len = _audios.length; i < len; i += 1) {
                    var currentAudio = _audios[i];
                    if(audio.id === id) {
                        audios[i] = undefined;
                        break;
                    }
                }

                _audios = _audios.filter(function (item) {
                    return item !== undefined;
                });

                return this;
            }
        };
        return {
            get: function (name) {
                return Object.create(playlist)
                    .init(name);
            }
        };
    } ());
    players = (function () {
        var player = {
            init: function (name) {
                if (!isNameValid(name, CONSTS.PLAYER.MIN_LENGTH, CONSTS.PLAYER.MAX_LENGTH)) {
                    throw {
                        name: 'InvalidPlayerName',
                        message: 'Player name must be between ' + CONSTS.PLAYER.MIN_LENGTH + ' and ' + CONSTS.PLAYER.MAX_LENGTH + ' characters long'
                    };
                }

                this.name = name;
                this._playlists = [];
                return this;
            },

            addPlaylist: function (playlist) {
            this.playlists.push(playlist);
            return this;
        }
    };

    Object.defineProperties(player, {
        _playlists: {
            get: function () {
                return this.playlists;
            },

            set: function (value) {
                if (!this.playlists) {
                    this.playlists = value;
                }
            }
        }
    });
    return {
        get: function (name) {
            return Object.create(player)
                .init(name);
        }
    };
} ());
return {
    players: players,
    playlists: playlists
};
}
module.exports = solve;