require("dotenv").config();
const fastify = require('fastify')();
const { PubSub } = require("@google-cloud/pubsub");
const pubSubClient = new PubSub({ projectId: process.env.PUBSUB_PROJECT_ID });

const createTopic = require("./src/createTopic");
const createSubscription = require("./src/createSubscription");
const publishMessage = require("./src/publishMessages");
const initialiseSubscribers = require("./src/pullSubscribers");

fastify.decorate('pubSubClient', pubSubClient);

fastify.get('/', async (request, reply) => {
  return { message: 'Demo of Google PubSub' }
});

fastify.register(async (fastify, opts, done) => {
  await createTopic(fastify);
  await createSubscription(fastify);
  await initialiseSubscribers(fastify);
  await publishMessage(fastify);
  done();
});



const start = async () => {
  try {
    const address = await fastify.listen(3000);
    fastify.log.info(`server listening on ${address}`)

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();