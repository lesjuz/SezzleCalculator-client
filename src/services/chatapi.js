import Axios from "axios";

const api = Axios.create({
    baseURL: 'https://sezzle-cal-server.herokuapp.com',
});


const chatAPI = {
    getMessages: () => {
        console.log('Calling get messages from API');
        return api.get(`/chat/getPrevious`);
    },

    sendMessage: (username, text) => {
        let msg = {
            sender: username,
            content: text
        }
        return api.post(`/api/send`, msg);
    }
}


export default chatAPI;
