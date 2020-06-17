module.exports = async (fastify) => {
  try {
    const { SUBSCRIPTION_NAME: subscriptionName } = process.env;

    const subscription = fastify.pubSubClient.subscription(subscriptionName);
    subscription.on("message", message => {
      console.log("RECEIVED THE MESSAGE SUCCESSFULLY");
      console.log({ attribute: message.attributes, id: message.id, data: message.data.toString() });
      message.ack();
    });
    return Promise.resolve();
  } catch(e) {
    console.log("Error while pulling messages : ", e);
    return Promise.reject(e);
  }
};