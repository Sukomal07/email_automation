import { ConfidentialClientApplication } from '@azure/msal-node';
import { User } from '../models/User';
import { OUTLOOK_CLIENT_ID, OUTLOOK_CLIENT_SECRET, OUTLOOK_REDIRECT_URI, OUTLOOK_TENANT_ID } from '../utils/constants';

const msalConfig = {
    auth: {
        clientId: OUTLOOK_CLIENT_ID!,
        authority: `https://login.microsoftonline.com/${OUTLOOK_TENANT_ID}`,
        clientSecret: OUTLOOK_CLIENT_SECRET!,
    },
};

const msalClient = new ConfidentialClientApplication(msalConfig);

export const getOutlookAuthUrl = async () => {
    const authUrl = await msalClient.getAuthCodeUrl({
        scopes: [
            'https://outlook.office.com/Mail.Read',
            'https://outlook.office.com/Mail.Send',
            'openid',
            'profile',
            'offline_access',
        ],
        redirectUri: OUTLOOK_REDIRECT_URI!,
    });
    return authUrl;
};

export const getOutlookTokens = async (code: string) => {
    const tokenResponse = await msalClient.acquireTokenByCode({
        code,
        scopes: [
            'https://outlook.office.com/Mail.Read',
            'https://outlook.office.com/Mail.Send',
            'openid',
            'profile',
            'offline_access',
        ],
        redirectUri: OUTLOOK_REDIRECT_URI!,
    });

    const email = tokenResponse.account?.username;
    if (!email) throw new Error('Failed to get email from token response');

    let user = await User.findOne({ email });
    if (!user) {
        user = new User({ email, outlookTokens: tokenResponse });
    } else {
        user.outlookTokens = tokenResponse;
    }
    await user.save();

    return { accessToken: tokenResponse.accessToken, email };
};
