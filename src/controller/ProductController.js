const { executeQuery } = require('../database');

const getProduct = async (req, res) => {
    try {
        const query = 'SELECT * FROM "product"';
        const productData = await executeQuery(query);

        res.status(200).json(productData);
    } catch (error) {
        console.error('Error getting product data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { nameCategory, productName } = req.query;

        const query = `
            INSERT INTO "product" (nameCategory , productName)
            VALUES ('${nameCategory}', '${productName}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'product created successfully',
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const query = `
            SELECT * FROM "product" WHERE id = ${productId}
        `;

        const productData = await executeQuery(query);

        if (productData.length > 0) {
            res.status(200).json(productData[0]);
        } else {
            res.status(404).json({ error: 'product not found' });
        }
    } catch (error) {
        console.error('Error getting product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deleteQuery = `
            DELETE FROM "product" WHERE id = ${productId}
        `;

        const deleteproduct = await executeQuery(deleteQuery, true);

        if (deleteproduct && deleteproduct.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete product successfully', deleteProducteId: productId });
        } else {
            res.status(404).json({ error: 'product not found' });
        }


    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { nameCategory, productName } = req.query;

        const checkProductQuery = `SELECT * FROM "product" WHERE id = ${productId}`;
        const existingProduct = await executeQuery(checkProductQuery);

        if (!existingProduct || existingProduct.length === 0) {
            return res.status(404).json({ error: 'product not found' });
        }

        const updateQuery = `
            UPDATE "product" SET nameCategory = '${nameCategory}', productName = '${productName}' WHERE id = ${productId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'product updated successfully', updatedProductId: productId, nameCategory: nameCategory, productName: productName });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedProductId: productId });
        }

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getProduct, createProduct, deleteProduct, updateProduct, getProductById
};