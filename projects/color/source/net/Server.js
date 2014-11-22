
lychee.define('game.net.Server').requires([
	'lychee.data.BitON',
	'game.net.remote.Highscore'
]).includes([
	'lychee.net.Server'
]).exports(function(lychee, game, global, attachments) {

	var _BitON     = lychee.data.BitON;
	var _highscore = game.net.remote.Highscore;


	var Class = function(data) {

		var settings = lychee.extend({
			codec: _BitON
		}, data);


		lychee.net.Server.call(this, settings);



		/*
		 * INITIALIZATION
		 */

		this.bind('connect', function(remote) {

			console.log('(Color) game.net.Server: Remote connected (' + remote.host + ':' + remote.port + ')');

			remote.addService(new _highscore(remote));

		}, this);

		this.bind('disconnect', function(remote) {

			console.log('(Color) game.net.Server: Remote disconnected (' + remote.host + ':' + remote.port + ')');

		}, this);


		this.connect();

	};


	Class.prototype = {

		listen: function(port, host) {

			console.log('(Color) game.net.Server: Listening on ' + host + ':' + port);

			lychee.net.Server.prototype.listen.call(this, port, host);

		}

	};


	return Class;

});

