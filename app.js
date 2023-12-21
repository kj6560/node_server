import express from 'express';
import passport from 'passport';
import { router } from '../instant_sports/routes/api.js';
import { web } from '../instant_sports/routes/web.js';
import authRoutes from '../instant_sports/routes/auth.js';
import helmet from 'helmet';
import session from 'express-session'; // Import express-session


const app = express();
app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');

app.use(session({ // Add express-session middleware
  secret: 'keshav_univ', // Replace with your secret key
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/api/v1', router);
app.use('/',web);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
