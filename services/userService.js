const db = require('../models');

const getAllUsers = async () => {
    try {
        const allUsers = await db.Users.findAll({
            include: [
                {
                    // Aquí permitimos mostrar los roles con la informacion del usuario
                    model: db.Rols,
                    //required: true,         // Requerido para que solo muestre los usuarios con rol
                    as: "rol",                // Alias del modelo
                    attributes: ['id', 'name'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'passwordResetToken', 'passwordResetExpires']  // Excluir campos sensibles y de fecha
            },
        });
        return allUsers;
    } catch (error) {
        throw new Error(`Error al traer los usuarios ${error.message}`); 
    }    
};

// Ruta getOneUser
const getOneUser = async (id) => {
    try {
        const user = await db.Users.findByPk(id, {
            include: [
                {
                    model: db.Rols,
                    as: "rol",
                    attributes: ['id', 'name'],
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'passwordResetToken', 'passwordResetExpires']
            },
        });
        return user;
    } catch (error) {
        throw new Error(`Error al traer el usuario ${error.message}`); 
    }    
}

// Ruta createUser
const createUser = async (firstName, lastName, email, phone, document, password, coordinadorType, manager, fkIdRols, passwordResetToken, passwordResetExpires) => { 
    try {
        const newUser = await db.Users.create({ 
            firstName, 
            lastName, 
            email, 
            phone, 
            document, 
            password, 
            coordinadorType, 
            manager, 
            fkIdRols,
            passwordResetToken, 
            passwordResetExpires
        });
        return newUser;
    } catch (error) {
        throw new Error(`Error al crear el usuario ${error.message}`);
    }
}

// Ruta updateUser
const updateUser = async (id, firstName, lastName, email, phone, document, password, coordinadorType, manager, fkIdRols, passwordResetToken, passwordResetExpires) => { 
    try {
        const user = await db.Users.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        user.document = document;
        user.password = password;
        user.coordinadorType = coordinadorType;
        user.manager = manager;
        user.fkIdRols = fkIdRols;
        user.passwordResetToken = passwordResetToken;
        user.passwordResetExpires = passwordResetExpires;
        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Error al actualizar el usuario ${error.message}`);
    }
}

// Ruta deleteUser
const deleteUser = async (id) => { 
    try {
        const user = await db.Users.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        await user.destroy();
        return user;
    } catch (error) {
        throw new Error(`Error al eliminar el usuario ${error.message}`);
    }
}

module.exports = { getAllUsers, getOneUser, createUser, updateUser, deleteUser };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos