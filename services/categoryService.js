const db = require('../models');

const getAllCategories = async () => {
    try {
        const allCategories = await db.Categories.findAll({
            // include: [
            //     {
            //         // Aquí permitimos mostrar las causas con la informacion de la categoría
            //         model: db.Causes,
            //         //required: true,         // Requerido para que solo muestre las categorías con causas
            //         as: "causes",            // Alias del modelo
            //         attributes: ['id', 'cause', 'variable'],
            //     },
            // ],
            // attributes: {
            //     exclude: ['createdAt', 'updatedAt']  // Excluir campos de fecha de creación y actualización
            // },
        });
        return allCategories;
    } catch (error) {
        throw new Error(`Error al traer las categorías ${error.message}`); 
    }    
};

// Ruta getOneCategory
const getOneCategory = async (id) => {
    try {
        const category = await db.Categories.findByPk(id, {
            // include: [
            //     {
            //         model: db.Causes,
            //         as: "causes",
            //         attributes: ['id', 'cause', 'variable'],
            //     },
            // ],
            // attributes: {
            //     exclude: ['createdAt', 'updatedAt']
            // },
        });
        return category;
    } catch (error) {
        throw new Error(`Error al traer la categoría ${error.message}`); 
    }    
}

// Ruta createCategory
const createCategory = async (name, description, addressing) => { 
    try {
        const newCategory = await db.Categories.create({ 
            name, 
            description, 
            addressing 
        });
        return newCategory;
    } catch (error) {
        throw new Error(`Error al crear la categoría ${error.message}`);
    }
}

// Ruta updateCategory
const updateCategory = async (id, name, description, addressing) => { 
    try {
        const category = await db.Categories.findByPk(id);
        if (!category) {
            throw new Error('Categoría no encontrada');
        }
        category.name = name;
        category.description = description;
        category.addressing = addressing;
        await category.save();
        return category;
    } catch (error) {
        throw new Error(`Error al actualizar la categoría ${error.message}`);
    }
}

// Ruta deleteCategory
const deleteCategory = async (id) => { 
    try {
        const category = await db.Categories.findByPk(id);
        if (!category) {
            throw new Error('Categoría no encontrada');
        }
        await category.destroy();
        return category;
    } catch (error) {
        throw new Error(`Error al eliminar la categoría ${error.message}`);
    }
}

module.exports = { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos