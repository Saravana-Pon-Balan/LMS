const { CohereClient } = require('cohere-ai');
require('dotenv').config()

const cohere = new CohereClient({
  token: `${process.env.CHAT_BOT}`,
});

const Bot = async(msg) =>{
    const response = await cohere.generate({
        prompt: msg,
      });
      return response.generations[0].text;
}
module.exports = Bot;