import { User } from "../database/models/User"
import { UserCreationAttributes } from "../database/models/User"

/*O código interage com o modelo User do Sequelize para executar operações relacionadas ao usuário no banco de dados. */
export const userService = {

    findByEmail: async (email: string) => { /*Essa função recebe um endereço de e-mail como parâmetro e retorna um objeto User do banco de dados que corresponde ao e-mail fornecido.*/
        const user = await User.findOne({
            where: {
                email
            }
        })
        return user
    },

    create: async (attributes: UserCreationAttributes) => { /*Essa função cria um novo usuário no banco de dados.
                                                            Recebe um objeto attributes que contém as informações necessárias para criar um usuário (como nome, e-mail e senha).
                                                            Utiliza o método User.create do Sequelize para realizar a criação.*/
        const user = await User.create(attributes)
        return user
    },

    /*Esta função atualiza as informações de um usuário no banco de dados com base no ID fornecido.
Recebe o ID do usuário e um objeto attributes contendo as informações a serem atualizadas (nome, e-mail e senha).
Utiliza o método User.update do Sequelize para realizar a atualização.*/
    update: async (id: number, attributes: {
        nome: string,
        email: string,
        senha_hash: string
    }) => {
        await User.update(attributes, { 
            where: { id }
        })
    },
}