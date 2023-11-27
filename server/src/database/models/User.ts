import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../sequelize_module'

export interface User {
  id: number,
  email: string,
  nome: string,
  senha_hash: string
}

export interface UserCreationAttributes extends Optional<User, 'id'> {}

interface UserInstance extends Model<User, UserCreationAttributes>, User {
}

export const User = sequelize.define <UserInstance, User>('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  senha_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'users',
})

export default User