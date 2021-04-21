var _   			= require("./utils");
var ws  			= require("ws");
var commands 		= require("./commands");
var eventEmitter 	= require("./events").EventEmitter;

var client = function client(opts) {
    if(this instanceof client === false) { return new client(opts); }

	this.opts 				= _.get(opts, {});
	this.opts.connection 	= this.opts.connection || {};
	this.opts.identity 		= this.opts.identity || {};
	this.opts.options 		= this.opts.options || {};
	this.opts.headers 		= {
		'User-Agent': 'PTV-BOT-' + this.opts.identity.username
	};

    this.secure = _.get(
		this.opts.connection.secure,
		!this.opts.connection.server && !this.opts.connection.port
	);

    this.ws = null;

    eventEmitter.call(this);
}

_.inherits(client, eventEmitter);

// Put all commands in prototype..
for(var methodName in commands) {
	client.prototype[methodName] = commands[methodName];
}

// Connect to server..
client.prototype.connect = function connect() {
    return new Promise((resolve, reject) => {
		this.server = _.get(this.opts.connection.server, "chat.picarto.tv");
		this.port 	= _.get(this.opts.connection.port, 80);

		// Override port if using a secure connection..
		if(this.secure) { this.port = 443; }
		if(this.port === 443) { this.secure = true; }

		this._openConnection();
    });
};

// Close Socket Connection..
client.prototype.close = function close() {
	try {
		this.ws.close();
	} catch(e) {
		console.log(e);
	}
}

// Emit multiple events..
client.prototype.emits = function emits(types, values) {
	for (var i = 0; i < types.length; i++) {
		var val = i < values.length ? values[i] : values[values.length - 1];
		this.emit.apply(this, [types[i]].concat(val));
	}
};

// Open a connection..
client.prototype._openConnection = function _openConnection() {
	const username 	= this.opts.identity.username ? this.opts.identity.username : null;
	const password 	= this.opts.identity.password ? this.opts.identity.password : null;
	this.ws 		= new ws(`${this.secure ? "wss" : "ws"}://${this.server}/bot/username=${username}&password=${password}`, {
        headers: {
            'User-Agent': 'PTV-BOT-' + this.opts.identity.username
        }
	});

	this.ws.onmessage 	= this._onMessage.bind(this);
	this.ws.onerror 	= this._onError.bind(this);
	this.ws.onclose 	= this._onClose.bind(this);
	this.ws.onopen 		= this._onOpen.bind(this);
};

// Called when the WebSocket connection's readyState changes to OPEN.
client.prototype._onOpen = function _onOpen() {
	this.emits(["connecting"], [[this.server, this.port], [null]]);
};

// Called when an error occurs..
client.prototype._onError = function _onError() {
	this.emits(["disconnected"], ["Error Connecting to the Server"]);
};

// Called when the WebSocket connection's readyState changes to CLOSED..
client.prototype._onClose = function _onClose() {
	this.emits(["closed"], ["Connection Closed"]);
};

// Called when a message is received from the server..
client.prototype._onMessage = function _onMessage(event) {
	var message = event.data;

	if(!_.isNull(message)) { 
		var message = _.parseJson(message);
		if(message) {
			if(typeof message.t !== "undefined") {
				switch(message.t) {
					case 'authentication':
						if(typeof message.success !== "undefined" && message.success) {
							this.emits(["connected"], [this.server, this.port]);
						} else {
							this.emits(["unauthenticated"], [["Authentication Failed"]]);
						}
						break;

					case 'un':
					case 'ur':
						msg 	= message.n;
						channel = message.n;

						this.emits(["user"], [
							[channel, message.m, msg, false]
						]);
						break;

					default:
						if(typeof message.m !== "undefined") {
							var msg = channel = null;

							if(_.isObject(message.m)) {
								msg 	= message.m;
								channel = message.n;

								this.emits(["chat", "message"], [
									[channel, message.m, msg, false]
								]);
							} else if(_.isArray(message.m)) {
								message.m.forEach(mNode => {
									if(typeof mNode.m !== "undefined") {
										msg = mNode.m;
									}

									if(typeof mNode.n !== "undefined") {
										channel = mNode.n;
									}
									
									this.emits(["chat", "message"], [
										[channel, message.m, msg, false]
									]);
								});
							}
						} else {

						}
						
						break;
				}
			} else {

			}
		} else {

		}
	} else {

	}
};

// Send a message to channel..
client.prototype._sendMessage = function _sendMessage(message, fn) {
	// Promise a result..
	return new Promise((resolve, reject) => {
		this.ws.send(message);
	});
};

if(typeof module !== "undefined" && module.exports) {
	module.exports = client;
}