import Axios from "axios";

const api = Axios.create({
    baseURL: 'https://sezzle-cal-server.herokuapp.com',
});


const chatAPI = {
    getMessages: () => {

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
