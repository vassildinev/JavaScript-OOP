function solve() {
    return (function () {
        var _nextPlayableId = 1,
            _nextPlaylistId = 1,
            _nextPlayerId = 1;

        function validateName(name) {
            if(!(3 < name.length && name.length < 25)) {
                throw new Error('Invalid name, title or author string length')
            }
        }

        var playable = (function () {
            var playable = {};
            Object.defineProperties(playable, {
                init: {
                    value: function (title, author) {
                        validateName(title);
                        validateName(author);

                        this.title = title;
                        this.author = author;
                        this.id = _nextPlayableId;
                        _nextPlayableId += 1;

                        return this;
                    }
                },

                play: {
                    value: function () {
                        return this.id + '. ' + this.title + ' - ' + this.author;
                    }
                }
            });

            return playable;
        }());

        var audio = (function (parent) {
            var audio = Object.create(parent);
            Object.defineProperties(audio, {
                init: {
                    value: function (title, author, length) {
                        parent.init.call(this, title, author);
                        if (length <= 0) {
                            throw new Error('Audio length must be a number greater than zero')
                        }

                        this.length = length;
                        return this;
                    }
                },

                play: {
                    value: function () {
                        var baseResult = parent.play.call(this);
                        return baseResult + ' - ' + this.length;
                    }
                }
            });

            return audio;
        }(playable));

        var video = (function (parent) {
            var video = Object.create(parent);
            Object.defineProperties(video, {
                init: {
                    value: function (title, author, imdbRating) {
                        parent.init.call(this, title, author);
                        if (!(1 < imdbRating && imdbRating < 5)) {
                            throw new Error('Video IMDB rating must be between 1 and 5')
                        }

                        this.imdbRating = imdbRating;
                        return this;
                    }
                },

                play: {
                    value: function () {
                        var baseResult = parent.play.call(this);
                        return baseResult + ' - ' + this.imdbRating;
                    }
                }
            });

            return video;
        }(playable));

        var playlist = (function () {
            var playlist = {};
            Object.defineProperties(playlist, {
                init: {
                    value: function (name) {
                        validateName(name);

                        this.name = name;
                        this.id = _nextPlaylistId;
                        _nextPlaylistId += 1;
                        this.playables = [];

                        return this;
                    }
                },

                addPlayable: {
                    value: function (playableToAdd) {
                        //if (!playable.isPrototypeOf(playableToAdd) || !(typeof playableToAdd === 'object' &&
                        //    (playableToAdd.hasOwnProperty('title') && playableToAdd.hasOwnProperty('author')) &&
                        //    playableToAdd.hasOwnProperty('id'))) {
                        //    throw new Error('Invalid playable to add')
                        //}

                        this.playables.push(playableToAdd);
                        return this;
                    }
                },

                getPlayableById: {
                    value: function (id) {
                        for (var i = 0, len = this.playables.length; i < len; i += 1) {
                            var currentAudio = this.playables[i];
                            var currentAudioId = currentAudio.id;

                            if (currentAudioId === id) {
                                return currentAudio;
                            }
                        }

                        return null;
                    }
                },

                removePlayable: {
                    value: function (param) {
                        var id;
                        if (typeof param === 'number') {
                            id = param;
                        }

                        if (typeof param === 'object') {
                            id = param.id;
                        }

                        for (var i = 0, len = this.playables.length; i < len; i += 1) {
                            var currentAudioId = this.playables[i].id;
                            if (currentAudioId === id) {
                                this.playables[i] = undefined;
                                this.playables = this.playables.filter(function (item) {
                                    return item !== undefined;
                                });

                                return this;
                            }
                        }

                        throw new Error('Invalid playable to remove');
                    }
                },

                listPlayables: {
                    value: function (page, size) {
                        var minIndex = page * size,
                            maxIndex = (page + 1) * size - 1,
                            result = [];

                        if (minIndex > this.playables.length ||
                            page < 0 || size <= 0) {
                            throw new Error('Invalid page or size parameter')
                        }

                        function sortByTitle(x, y) {
                            if(x.title !== undefined)
                                return x.title > y.title;
                            else
                                return x.name > y.name;
                        }

                        function thenSortById(x, y) {
                            if(x.title !== undefined)
                                return x.title[0] == y.title[0] ? x.id - y.id : x.title - y.title;
                            else
                                return x.name[0] == y.name[0] ? x.id - y.id : x.name - y.name;

                        }

                        var sortedPlayables = this.playables.slice().sort(sortByTitle).sort(thenSortById);

                        for (var i = 0, len = sortedPlayables.length; i < len; i += 1) {
                            if (minIndex <= i && i <= maxIndex) {
                                result.push(sortedPlayables[i]);
                            }
                        }

                        return result;
                    }
                }
            });

            return playlist;
        }());

        var player = (function () {
            var player = {};
            Object.defineProperties(player, {
                init: {
                    value: function (name) {
                        validateName(name);

                        this.name = name;
                        this.id = _nextPlayerId;
                        _nextPlayerId += 1;
                        this.playlists = [];

                        return this;
                    }
                },

                addPlaylist: {
                    value: function (playlistToAdd) {
                        //if (!playlist.isPrototypeOf(playlistToAdd) || !(typeof playlistToAdd === 'object' &&
                        //    (playlistToAdd.hasOwnProperty('id') && playlistToAdd.hasOwnProperty('name')))) {
                        //    throw new Error('Invalid playlist to add')
                        //}

                        this.playlists.push(playlistToAdd);
                        return this;
                    }
                },

                getPlaylistById: {
                    value: function (id) {
                        for (var i = 0, len = this.playlists.length; i < len; i += 1) {
                            if (this.playlists[i].id === id) {
                                return this.playlists[i];
                            }
                        }

                        return null;
                    }
                },

                removePlaylist: {
                    value: function (param) {
                        var id;
                        if (typeof param === 'number') {
                            id = param;
                        }

                        if (typeof param === 'object') {
                            id = param.id;
                        }

                        for (var i = 0, len = this.playlists.length; i < len; i += 1) {
                            if (this.playlists[i].id === id) {
                                this.playlists[i] = undefined;
                                this.playlists = this.playlists.filter(function (item) {
                                    return item !== undefined
                                });

                                return this;
                            }
                        }

                        throw new Error('Playlist not found');
                    }
                },

                listPlaylists: {
                    value: function (page, size) {
                        var minIndex = page * size,
                            maxIndex = (page + 1) * size - 1,
                            result = [];

                        if (minIndex > this.playlists.length ||
                            page < 0 || size <= 0) {
                            throw new Error('Invalid page or size parameter')
                        }

                        function sortByTitle(x, y) {
                            return x.name > y.name;
                        }

                        function thenSortById(x, y) {
                            return x.name[0] == y.name[0] ? x.id - y.id : x.name - y.name;
                        }

                        var sortedPlaylists = this.playlists.slice().sort(sortByTitle).sort(thenSortById);

                        for (var i = 0, len = sortedPlaylists.length; i < len; i += 1) {
                            if (minIndex <= i && i <= maxIndex) {
                                result.push(sortedPlaylists[i]);
                            }
                        }

                        return result;
                    }
                },

                contains: {
                    value: function (playlist, playable) {
                        for(var i = 0, len = playlist.playables.length; i < len; i += 1) {
                            var currentPlayable = playlist.playables[i];
                            if(currentPlayable.title === playable.title &&
                               currentPlayable.author === playable.author) {
                                return true;
                            }
                        }

                        return false;
                    }
                },

                search: {
                    value: function (pattern) {
                        var result = [];
                        for(var i = 0, len = this.playlists.length; i < len; i++) {
                            var currentPlaylist = this.playlists[i],
                                currentPlaylistPlayables = currentPlaylist.playables.slice(),
                                hasPlayablesMatchingPattern = currentPlaylistPlayables
                                .filter(function (item) {
                                    return item.title.indexOf(pattern) !== -1;
                                })
                                .length !== 0;

                            if(hasPlayablesMatchingPattern) {
                                result.push({
                                    name: currentPlaylist.name,
                                    id: currentPlaylist.id
                                });
                            }
                        }

                        return result.sort(function (x, y) {
                            return x.id > y.id;
                        });
                    }
                }
            });

            return player;
        }());

        return {
            getPlayer: function (name) {
                return Object.create(player).init(name);
            },
            getPlaylist: function (name) {
                return Object.create(playlist).init(name);
            },
            getAudio: function (title, author, length) {
                return Object.create(audio).init(title, author, length);
            },
            getVideo: function (title, author, imdbRating) {
                return Object.create(title, author, imdbRating);
            }
        };
    }());
}

module.exports = solve;