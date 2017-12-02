var redis = require('redis');
var client = redis.createClient();


var Get = (key, callback) => {
    client.get(key, callback)
}

var Add = (key, value, callback) => {
    client.set(key, value, callback);
}

var AddH = (username, kvpair, callback) => {
    for (var kv in kvpair) {
        client.HSET(username, kv, kvpair[kv])
    }
    callback(null, 'ok');
}

var GetHAll = (username, callback) => {
    client.hgetall(username, callback);
}

var DelUser = (username, callback) => {
    client.DEL(username, callback);
}

module.exports = { Get, Add, AddH, GetHAll, DelUser };