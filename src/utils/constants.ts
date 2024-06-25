import dotenv from 'dotenv'

dotenv.config()

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const OUTLOOK_CLIENT_ID = process.env.OUTLOOK_CLIENT_ID
const OUTLOOK_TENANT_ID = process.env.OUTLOOK_TENANT_ID
const OUTLOOK_CLIENT_SECRET = process.env.OUTLOOK_CLIENT_SECRET
const OUTLOOK_REDIRECT_URI = process.env.OUTLOOK_REDIRECT_URI

export {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    PORT,
    MONGO_URI,
    OUTLOOK_CLIENT_ID,
    OUTLOOK_TENANT_ID,
    OUTLOOK_CLIENT_SECRET,
    OUTLOOK_REDIRECT_URI
}