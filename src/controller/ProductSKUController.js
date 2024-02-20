const { executeQuery } = require('../database');

const getProductSKU = async (req, res) => {
    try {
        const query = 'SELECT * FROM "ProductSKU"';
        const productSKUData = await executeQuery(query);

        res.status(200).json(productSKUData);
    } catch (error) {
        console.error('Error getting productSKUData data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createProductSKU = async (req, res) => {
    try {
        const { idproduct, idclassify, idsize, idSKU } = req.query;

        const query = `
            INSERT INTO "ProductSKU" ( idproduct, idclassify, idsize, idsKU ) 
            VALUES ( '${idproduct}', '${idclassify}', '${idsize}', '${idSKU}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'productSKU created successfully',
        });
    } catch (error) {
        console.error('Error creating productSKU:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getProductSKUById = async (req, res) => {
    try {
        const productSKUId = req.params.id;

        const query = `
            SELECT * FROM "ProductSKU" WHERE id = ${productSKUId}
        `;

        const productSKUData = await executeQuery(query);

        if (productSKUData.length > 0) {
            res.status(200).json(productSKUData[0]);
        } else {
            res.status(404).json({ error: 'productSKU not found' });
        }
    } catch (error) {
        console.error('Error getting productSKU by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteProductSKU = async (req, res) => {
    try {
        const productSKUId = req.params.id;

        const deleteQuery = `
            DELETE FROM "ProductSKU" WHERE id = ${productSKUId}
        `;

        const deleteproductSKU = await executeQuery(deleteQuery, true);

        if (deleteproductSKU && deleteproductSKU.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete shop successfully', deleteproductSKUId: productSKUId });
        } else {
            res.status(404).json({ error: 'productSKU not found' });
        }


    } catch (error) {
        console.error('Error deleting productSKU:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProductSKU = async (req, res) => {
    try {
        const productSKUId = req.params.id;
        const { idproduct, idclassify, idsize, idSKU } = req.query;

        const checkProductSKUQuery = `SELECT * FROM "ProductSKU" WHERE id = ${productSKUId}`;
        const existingProductSKU = await executeQuery(checkProductSKUQuery);

        if (!existingProductSKU || existingProductSKU.length === 0) {
            return res.status(404).json({ error: 'shop not found' });
        }

        const updateQuery = `
            UPDATE "ProductSKU" SET idproduct = '${idproduct}', idclassify = '${idclassify}', idsize = '${idsize}', idSKU = '${idSKU}' WHERE id = ${productSKUId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'productSKU updated successfully', updatedproductSKUId: productSKUId, idproduct: idproduct, idclassify: idclassify, idsize: idsize, idSKU: idSKU, });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedproductSKUId: productSKUId });
        }

    } catch (error) {
        console.error('Error updating productSKU:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getProductSKU, createProductSKU, deleteProductSKU, updateProductSKU, getProductSKUById
};