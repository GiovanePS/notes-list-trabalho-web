import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { User } from './database/models/User'
import bcrypt from 'bcrypt'

/*Implementa a configuração do Passport.js com a estratégia de autenticação local (usando nome de usuário e senha). */
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (email, password, done) => {
  try {
    const user = await User.findOne({ /*Busca um usuário no banco de dados com o e-mail fornecido.*/
      where: {
        email: email
      }
    })
    if (!user) {
      return done(null, false, { message: 'Usuário não encontrado' });
    }

    if (await bcrypt.compare(password, user.senha_hash)) { /*Compara a senha fornecida com a senha armazenada no banco de dados usando o método bcrypt.compare.*/
      return done(null, user)
    }

    return done(null, false, { message: 'Senha incorreta' }) /*Chama a função done para indicar o resultado da autenticação.*/
  } catch (error) {
    console.error(error)
  }
}))

passport.serializeUser((user: any, done) => {
  return done(null, user.id) /*o ID do usuário é serializado e armazenado na sessão.*/
})

passport.deserializeUser(async (id: number, done) => { /*Define como desserializar o usuário com base no ID armazenado na sessão.*/
  try {
    const user = await User.findOne({ /*Busca o usuário no banco de dados usando o ID.*/
      where: {
        id: id
      }
    })
  
    if (!user) {
      return done(new Error('Usuário não encontrado'))
    }

    return done(null, user) /*Chama a função done com o usuário encontrado.*/
  } catch (error) {
    console.error(error)
  }
})