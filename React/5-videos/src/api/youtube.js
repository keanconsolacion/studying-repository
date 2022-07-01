import axios from 'axios';

const apiKey = "AIzaSyDh0fcJeOpXHPFk6Gr2pK4MuJK65cC8lIM";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: 'snippet',
    maxResults: 5,
    type: 'video',
    key: apiKey
  }
})