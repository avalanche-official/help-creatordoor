// src/lib/appwrite.js
import { Client, Functions } from 'appwrite'

// Initialize Client
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('68937490002934fb65f0') // Your project ID

// Initialize Functions service
export const functions = new Functions(client)

// Configuration
export const CONFIG = {
  klaviyoNewsletterFunctionId: '691263f1003bac365d30',
}

export { client }