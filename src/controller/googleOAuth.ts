import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/User';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '../utils/constants';


const oauth2Client = new OAuth2Client({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI
})

export const getGoogleAuthUrl = () => {
    const scopes = ['https://mail.google.com/', 'profile', 'email'];
    return oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes });
};

export const getGoogleTokens = async (code: string) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2',
    });
    const userInfo = await oauth2.userinfo.get();
    const email = userInfo.data.email;

    let user = await User.findOne({ email });
    if (!user) {
        user = new User({ email, googleTokens: tokens });
    } else {
        user.googleTokens = tokens;
    }
    await user.save();

    return { tokens, email };
};
