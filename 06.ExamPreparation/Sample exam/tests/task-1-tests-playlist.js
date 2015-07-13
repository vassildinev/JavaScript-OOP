// Generated by CoffeeScript 1.9.3
var expect, result;

expect = require('chai').expect;
result = require('../tasks/task-1')();

describe('Sample exam tests', function () {
    describe('PlayList', function () {
        describe('With valid input', function () {
            it('expect getPlaylist to exist, to be a function and to take a single parameter and to enable chaining', function () {
                expect(result.getPlaylist).to.exist;
                expect(result.getPlaylist).to.be.a('function');
                expect(result.getPlaylist).to.have.length(1);
            });
            it('expect getPlaylist to return a new playlist instance, with provided name and generated id', function () {
                var name, playlist;
                name = 'Rock and roll';
                playlist = result.getPlaylist(name);

                expect(playlist).to.exist;
                expect(playlist).to.be.an('object');
                expect(playlist.name).to.equal(name);
                expect(playlist.id).to.exist;
                expect(playlist.id > 0).to.equal(true);
            });
            it('expect getPlaylist to generate different ids', function () {
                var name = 'Rock and roll',
                    playlist1 = result.getPlaylist(name),
                    playlist2 = result.getPlaylist(name);

                expect(playlist1).to.exist;
                expect(playlist2).to.exist;
                expect(playlist1.id).not.to.equal(playlist2.id);
            });

            it('expect playlist.addPlayable() to exists, to be a function and to take a single parameter and to enable chaining', function () {
                var name = 'Rock and roll',
                    playlist = result.getPlaylist(name),
                    playable = {id: 1, name: 'Banana Rock', author: 'Wombles'};

                expect(playlist.addPlayable).to.exist;
                expect(playlist.addPlayable).to.be.a('function');
                expect(playlist.addPlayable).to.have.length(1);

                returnedPlaylist = playlist.addPlayable(playable);
                return expect(returnedPlaylist).to.equal(playlist);
            });
            it('expect playlist.getPlayableById() to exists, to be a function and to take a single parameter', function () {
                var name, playlist;
                name = 'Rock and roll';
                playlist = result.getPlaylist(name);

                expect(playlist.getPlayableById).to.exist;
                expect(playlist.getPlayableById).to.be.a('function');
                expect(playlist.getPlayableById).to.have.length(1);
            });
            it('expect playlist.addPlayable() to add the playable and playlist.getPlayableById() to retrieve the same playable', function () {
                var returnedPlayable,
                    name = 'Rock and roll',
                    playlist = result.getPlaylist(name),
                    playable = {id: 1, name: 'Banana Rock', author: 'Wombles'};

                returnedPlayable = playlist.addPlayable(playable).getPlayableById(1);
                expect(returnedPlayable.id).to.equal(playable.id);
                expect(returnedPlayable.name).to.equal(playable.name);
                expect(returnedPlayable.author).to.equal(playable.author);
            });

            it('expect playlist.removePlayable() to exists, to be a function and to take a single parameter', function () {
                var name = 'Rock and roll',
                    playlist = result.getPlaylist(name);

                expect(playlist.removePlayable).to.exist;
                expect(playlist.removePlayable).to.be.a('function');
                expect(playlist.removePlayable).to.have.length(1);
            });
            it('expect playlist.removePlayable() remove the playable with that id', function () {
                var gotten,
                    name = 'Rock and roll',
                    plName = 'Banana Rock',
                    plAuthor = 'Wombles',
                    playlist = result.getPlaylist(name),
                    playable = {id: 1, name: plName, author: plAuthor};

                playlist.addPlayable(playable);
                playlist.removePlayable(playable);
                gotten = playlist.getPlayableById(1);
                expect(gotten).not.to.exists;
                expect(gotten).not.to.be.null;

                playlist.addPlayable(playable);
                playlist.removePlayable(1);
                gotten = playlist.getPlayableById(1);

                expect(gotten).not.to.exists;
                expect(gotten).not.to.be.null;
                expect(function() { playlist.removePlayable(10); }).to.throw();
            });

            it('expect playlist.listPlaylables() to exists, to be a function and to take 2 parameters', function () {
                var name, playlist;
                name = 'Rock and roll';
                playlist = result.getPlaylist(name);

                expect(playlist.listPlaylables).to.exist;
                expect(playlist.listPlaylables).to.be.a('function');
                expect(playlist.listPlaylables).to.have.length(2);
            });
            it('expect playlist.listPlaylables() to return correct number of playables and to throw errors when invalid data is passed', function () {
                var i, name, playlist;
                name = 'Hard Rock';
                playlist = result.getPlaylist(name);

                for (i = 0; i < 35; i += 1) {
                    playlist.addPlayable({id: (i + 1), name: 'Rock' + (9 - (i % 10))});
                }

                expect(playlist.listPlaylables(2, 10).length).to.equal(10);
                expect(playlist.listPlaylables(3, 10).length).to.equal(5);

                expect(function() { playlist.listPlaylables(-1, 10) }).to.throw();
                expect(function() { playlist.listPlaylables(5, 10) }).to.throw();
                expect(function() { playlist.listPlaylables(1, -1) }).to.throw();
            });
        });
    });
});

//# sourceMappingURL=task-1-tests.js.map