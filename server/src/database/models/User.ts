import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../index'

interface UserAttributes {
  id: number,
  email: string,
  nome: string,
  senha_hash: string
}

interface UserCreationAttributes extends UserAttributes {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public nome!: string;
  public senha_hash!: string;
}

User.init({
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
  tableName: 'users',
  sequelize
})

export default User