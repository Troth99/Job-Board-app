import { Router } from 'express';
import passport from '../config/passport.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import RefreshToken from '../models/RefreshToken.js';

const router = Router();

// Starting google authentication process
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Step 2: Google returns the user here after login
router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, async (err, user) => {
        if (err || !user) {
            console.error('OAuth error:', err);
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
        }
        try {
            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            await RefreshToken.create({
                userId: user._id,
                token: refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });

            res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
        } catch (error) {
            console.error('OAuth callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
        }
    })(req, res, next);
});

export default router;