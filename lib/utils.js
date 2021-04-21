var self = module.exports = {
	// Return the second value if the first value is undefined..
	get: (obj1, obj2) => typeof obj1 === "undefined" ? obj2 : obj1,
	
	// Value is null..
	isNull: obj => obj === null,

	// Value is Array
	isArray: obj => {
		return (!!obj) && (obj.constructor === Array);
	},

	// Value is Object
	isObject: obj => {
		return (!!obj) && (obj.constructor === Object);
	},

	// Value is JSON
	parseJson: obj => {
		try {
			return JSON.parse(obj);
		} catch(e) {
			return false;
		}
	},

    // Return a valid channel name..
	channel: str => {
		var channel = (str ? str : "").toLowerCase();
		return channel[0] === "#" ? channel : "#" + channel;
	},

	// Inherit the prototype methods from one constructor into another..
	inherits: (ctor, superCtor) => {
		ctor.super_ = superCtor
		var TempCtor = function () {};
		TempCtor.prototype = superCtor.prototype;
		ctor.prototype = new TempCtor();
		ctor.prototype.constructor = ctor;
	},
}