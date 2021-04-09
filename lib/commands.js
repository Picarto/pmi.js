module.exports = {
    // Send a message on a channel..
	say(channel, message) {
		return this._sendMessage(JSON.stringify({type: "chat", message: message }), (resolve, reject) => {
			resolve([channel, message]);
		});
	},

	// Clear all messages on a channel..
	clear() {
		return this._sendMessage(JSON.stringify({type: "clearHistory"}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// Clear all messages on a channel..
	clearUser(channel) {
		return this._sendMessage(JSON.stringify({type: "clearUser", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// Ban a channel..
	ban(channel) {
		return this._sendMessage(JSON.stringify({type: "banUser", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// Unban a channel..
	unban(channel) {
		return this._sendMessage(JSON.stringify({type: "unbanUser", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// ShadowBan a channel..
	shadownban(channel) {
		return this._sendMessage(JSON.stringify({type: "shadowBanUser", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// UnShadowBan a channel..
	unshadownban(channel) {
		return this._sendMessage(JSON.stringify({type: "unshadowBanUser", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// Mod a channel..
	mod(channel) {
		return this._sendMessage(JSON.stringify({type: "setMod", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// UnMod a channel..
	unmod(channel) {
		return this._sendMessage(JSON.stringify({type: "unsetMod", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// Ignore a channel..
	ignore(channel) {
		return this._sendMessage(JSON.stringify({type: "ignoreUser", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// Unignore a channel..
	unignore(channel) {
		return this._sendMessage(JSON.stringify({type: "unignoreUser", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// Whitelist a channel..
	wlaccept(channel) {
		return this._sendMessage(JSON.stringify({type: "permitChat", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// Decline a channel..
	wldecline(channel) {
		return this._sendMessage(JSON.stringify({type: "declineChat", displayName: channel}), (resolve, reject) => {
			resolve([channel]);
		});
	},

	// Whisper a channel..
	whisper(channel, message) {
		return this._sendMessage(JSON.stringify({type: "whisper", displayName: channel, message: message}), (resolve, reject) => {
			resolve([channel]);
		});
	},
}