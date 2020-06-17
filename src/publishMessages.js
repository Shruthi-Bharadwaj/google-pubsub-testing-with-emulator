module.exports = async (fastify) => {
  try {
    const topicName = process.env.TOPIC_NAME;
    const data = JSON.stringify({
      hello: 'world'
    });

    const dataBuffer = Buffer.from(data);

    const messageId = await fastify.pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
    return Promise.resolve();
  } catch(e) {
    console.log('Error while publishing the message');
    return Promise.reject(e);
  }
};