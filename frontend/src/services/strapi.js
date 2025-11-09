import axios from 'axios'

const strapiApi = axios.create({
  baseURL: 'http://localhost:1337/api', // Your Strapi backend URL
  headers: {
    'Content-Type': 'application/json',
  },
})

export default strapiApi