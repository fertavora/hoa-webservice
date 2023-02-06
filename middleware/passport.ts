import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
    new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    },
    (username, password, done) => {
        if (username === "dummyuser" && password === "Test123") {
            done(null, { username, password });
        } else {
            done(null, false);
        }
    }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport;
