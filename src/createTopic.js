module.exports = async (fastify) => {
  try {
    const topicName = process.env.TOPIC_NAME;
    await fastify.pubSubClient.createTopic(topicName);
    console.log(`Topic ${topicName} is created`);
    return Promise.resolve();
  } catch(e) {
    console.log("Error while creating the topic : ", e);
    return Promise.reject(e);
  }
};