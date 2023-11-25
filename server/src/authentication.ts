import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { User } from './database/models/User'
import bcrypt from 'bcrypt'

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (email, password, done) => {
  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (!user) {
      return done(null, false)
    }

    if (await bcrypt.compare(user.senha_hash, password)) {
      return done(null, false)
    }

    return done(null, user)
  } catch (error) {
    console.error(error)
  }
}))

passport.serializeUser((user: any, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findOne({
      where: {
        id: id
      }
    })
  
    if (!user) {
      return done(new Error('Usuário não encontrado'))
    }

    return done(null, user)
  } catch (error) {
    console.error(error)
  }
})