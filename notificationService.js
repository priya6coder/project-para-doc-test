// Iteration 1: Added user SMS alert system
function sendSMSAlert(userId, message) {
    const userPhoneNumber = database.getPhone(userId);
    return smsGateway.send(userPhoneNumber, message);
}
