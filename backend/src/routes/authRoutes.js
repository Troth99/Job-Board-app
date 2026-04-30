import { Router } from 'express';
import passport from '../config/passport.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import RefreshToken from '../models/RefreshToken.js';

const router = Router();

// Starting google authentication process
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Step 2: Google returns the user here after login
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }),
    async (req, res) => {
        const accessToken = generateAccessToken(req.user._id);
        const refreshToken = generateRefreshToken(req.user._id);

        await RefreshToken.create({ token: refreshToken, user: req.user._id });

        // Redirect to frontend with tokens in URL
        res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    }
);

export default router;