module.exports = async (fastify) => {
  try {
    const { TOPIC_NAME: topicName, SUBSCRIPTION_NAME: subscriptionName } = process.env;
    await fastify.pubSubClient.topic(topicName).createSubscription(subscriptionName);
    console.log(`Subscription ${subscriptionName} is created for topic ${topicName}`);
    return Promise.resolve();
  } catch(e) {
    console.log("Error while creating the subscription : ", e);
    return Promise.reject(e);
  }
};