import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-add40.firebaseio.com/'
});

export default instance;