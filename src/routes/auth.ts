import express from 'express'
import { getGoogleAuthUrl, getGoogleTokens } from '../controller/googleOAuth';
import { getOutlookAuthUrl, getOutlookTokens } from '../controller/outlookOAuth';

const router = express.Router()

router.get('/auth/google', (req, res) => {
    const url = getGoogleAuthUrl();
    res.redirect(url);
});

router.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { email } = await getGoogleTokens(code as string);
        res.send(`Google OAuth successful for ${email}`);
    } catch (error) {
        res.status(500).send('Google OAuth failed');
    }
});

router.get('/auth/outlook', async (req, res) => {
    const url = await getOutlookAuthUrl();
    res.redirect(url);
});

router.get('/auth/outlook/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { email } = await getOutlookTokens(code as string);

        res.send(`Outlook OAuth successful for ${email}`);
    } catch (error) {
        res.status(500).send('Outlook OAuth failed');
        console.log(error)
    }
});

export default router;
