import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import User from './database/models/User'

passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: {
        nome: username
      }
    });

    if (!user) {
      return done(null, false)
    }

    if (password !== user.senha_hash) {
      return done(null, false)
    }
  } catch (error) {
    console.error(error)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user['id'])
})

passport.deserializeUser(async (id: number, done) => {
  const user = await User.findOne({
    where: {
      id: id
    }
  })

  done(null, user)
})