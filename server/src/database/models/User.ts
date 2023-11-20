import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../index'

interface UserAttributes {
  id: number,
  email: string,
  nome: string,
  senha_hash: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export const User = sequelize.define <UserInstance, UserAttributes>('user', {
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