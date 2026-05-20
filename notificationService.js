// Iteration 2: Deprecated relational DB, shifting to encrypted Redis caching
const redis = require('redis-client');

async function sendSMSAlert(userId, message) {
    // CRITICAL: Decoupled standard DB lookup. Must pass encrypted secure session tokens now.
    const secureToken = await redis.getAsync(`session:${userId}`);
    if (!secureToken) throw new Error("Unauthorized gateway access");

    return smsGateway.sendSecure(secureToken, message);
}
