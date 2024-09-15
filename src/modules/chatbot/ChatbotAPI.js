import HttpAuth from '../../services/HttpAuthService';

const API = {
  GetChatbotResponse: async payload => {
    const response = await HttpAuth.post('/v1/chat/ask-chatbot', payload);
    console.log('response', response);
    return response?.chat;
  },
};

export default API;
