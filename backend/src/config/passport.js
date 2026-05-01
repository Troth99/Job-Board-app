import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

dotenv.config();
const currentEnv = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${currentEnv}`, override: true });


passport.use(
    new GoogleStrategy(
        {
            //standard fields for google strategy

            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        //This function will be called after Google has authenticated the user and returned their 
        // profile information. We will use this information to find or create a user in our database.
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (user) return done(null, user);

                const email = profile.emails?.[0]?.value;
                if (email) {
                    user = await User.findOne({ email });
                    if (user) {
                        user.googleId = profile.id;
                        if (!user.avatar && profile.photos?.[0]?.value)
                            user.avatar = profile.photos[0].value;
                        await user.save();
                        return done(null, user);
                    }
                }
                // If no user is found, create a new one
                user = await User.create({
                    googleId: profile.id,
                    firstName: profile.name?.givenName || 'User',
                    lastName: profile.name?.familyName || undefined,
                    email: email || '',
                    phoneNumber: '',
                    location: '',
                    avatar: profile.photos?.[0]?.value || '',
                });
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;