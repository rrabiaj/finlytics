import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import prisma from './prisma';

export const setupPassport = () => {
  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || 'dummy',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy',
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0].value;
          if (!email) return done(new Error('No email found in Google profile'));

          let user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            // Logic for auto-registration or linking
            // For now, we just pass the profile
          }

          return done(null, user || { email, googleId: profile.id });
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );

  // Microsoft Strategy
  passport.use(
    new MicrosoftStrategy(
      {
        clientID: process.env.MICROSOFT_CLIENT_ID || 'dummy',
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET || 'dummy',
        callbackURL: '/api/auth/microsoft/callback',
        scope: ['user.read'],
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          const email = profile.emails?.[0].value;
          if (!email) return done(new Error('No email found in Microsoft profile'));

          let user = await prisma.user.findUnique({ where: { email } });

          return done(null, user || { email, microsoftId: profile.id });
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id || user.email);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
