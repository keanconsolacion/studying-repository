import axios from 'axios';

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID 8Mu9FupfOflbbKlF68Y2MQ-UxocNKYBdLm71C-A91no",
  }
});