import Axios from "axios";

const api = Axios.create({
    baseURL: '/api/',
});
const host= Axios.create({
    baseURL: 'https://sezzle-cal-server.herokuapp.com',
});

const chatAPI = {
    getMessages: () => {

        return host.get(`/chats`);
    },

    sendMessage: (username, text) => {
        let msg = {
            sender: username,
            content: text
        }
        return api.post(`send`, msg);
    }
}


export default chatAPI;
