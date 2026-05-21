# Order Processing Module
This module handles basic e-commerce customer checkouts locally.

## Notification Service (`notificationService.js`)
This service is responsible for sending SMS alerts to users.

### Key Architectural Changes (Breaking)

**1. Dependency on Encrypted Redis Cache Cluster:**
User session lookups for the notification service have been migrated from a direct database lookup to an encrypted Redis cache cluster. This is a critical new dependency for the `sendSMSAlert` functionality.

**2. Secure Session Tokens:**
The `sendSMSAlert` function now retrieves a `secureToken` from Redis using the `userId`. This token is essential for authorizing and sending SMS messages. Direct database lookups for user phone numbers have been deprecated.

**3. Asynchronous Operations:**
The `sendSMSAlert` function is now `async`, reflecting the network call required to fetch the secure token from the Redis cache.

**4. Secure SMS Gateway Interaction:**
The `smsGateway` now utilizes a `sendSecure` method, which requires the retrieved `secureToken` for message delivery, enhancing security.

### Usage (sendSMSAlert)

The `sendSMSAlert` function now expects a `userId` to retrieve a secure session token from Redis. This token is then used to securely send the SMS message via the `smsGateway`.

**Example (Conceptual):**
```javascript
// Ensure Redis client is configured and connected elsewhere in the application.

async function triggerSMSAlert(userId, message) {
    try {
        await sendSMSAlert(userId, message);
        console.log(`SMS alert successfully sent for user ${userId}`);
    } catch (error) {
        console.error(`Failed to send SMS alert for user ${userId}: ${error.message}`);
    }
}
```

### System Requirements:
*   An operational and accessible encrypted Redis cache cluster.
*   The `redis-client` library must be installed and configured within the application.
*   The `smsGateway` must be configured to support and accept secure session tokens via its `sendSecure` method.