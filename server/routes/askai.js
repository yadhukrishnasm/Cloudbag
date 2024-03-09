const wiki = require('wikipedia');
const WordPOS = require('wordpos');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const wordpos = new WordPOS();

const genAI = new GoogleGenerativeAI("AIzaSyBTGgr8wuiikhSZcCr4cWcsdrTtnwIn6bo");

const AskAi = async (ques) => {
    let prompt = ''; 
  try {
    const result = await new Promise((resolve, reject) => {
      wordpos.getPOS(ques, (result) => {
        resolve(result);
      });
    });

    // Construct prompt based on result
    if (result.nouns) {
      prompt = result.nouns.join('') + (result.rest ? '' + result.rest.join('') : '');
    } else if (result.rest) {
      prompt = result.rest.join('');
    } else {
      throw new Error('No data found');
    }

    console.log("Prompt = "+prompt)

    // Fetch summary based on prompt
    const summary = await wiki.summary(prompt);
    if (summary.hasOwnProperty('originalimage')) {
      return {
        answer: summary.extract,
        imagelink: summary.originalimage.source
      };
    } else {
      return { answer: summary.extract };
    }
  } catch (error) {
    try {
      // Reconstruct prompt if necessary
      const searchResults = await wiki.search(prompt);
      console.log('prompt in suggestion'+prompt)
      console.log(searchResults.suggestion)
      if (searchResults.suggestion) {
        const summary = await wiki.summary(searchResults.suggestion);
        if (summary.hasOwnProperty('originalimage')) {
          return {
            answer: summary.extract,
            imagelink: summary.originalimage.source
          };
        } else {
          return { answer: summary.extract };
        }
      } else {
        return gemini(ques);
        // return { answer: 'S1 No information' };
      }
    } catch (error) {
      return gemini(ques);
      // return { answer: 'S2 No information' };
      
    }
  }
};


async function gemini(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return {answer : text}
}


module.exports = AskAi;
