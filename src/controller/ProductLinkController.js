const { executeQuery } = require('../database');

const getProductLink = async (req, res) => {
    try {
        const query = 'SELECT * FROM "productLink"';
        const productlinkData = await executeQuery(query);

        res.status(200).json(productlinkData);
    } catch (error) {
        console.error('Error getting productlink data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createProductLink = async (req, res) => {
    try {
        const { idlink, idproduct, idclassify, idsize } = req.query;

        const query = `
            INSERT INTO "productLink" ( idlink, idproduct, idclassify, idsize) 
            VALUES ('${idlink}', '${idproduct}', '${idclassify}', '${idsize}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'productlink created successfully',
        });
    } catch (error) {
        console.error('Error creating productlink:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getProductLinkById = async (req, res) => {
    try {
        const productlinkId = req.params.id;

        const query = `
            SELECT * FROM "productLink" WHERE id = ${productlinkId}
        `;

        const productlinkData = await executeQuery(query);

        if (productlinkData.length > 0) {
            res.status(200).json(productlinkData[0]);
        } else {
            res.status(404).json({ error: 'productlink not found' });
        }
    } catch (error) {
        console.error('Error getting productlink by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteProductLink = async (req, res) => {
    try {
        const productlinkId = req.params.id;

        const deleteQuery = `
            DELETE FROM "productLink" WHERE id = ${productlinkId}
        `;

        const deleteproductlink = await executeQuery(deleteQuery, true);

        if (deleteproductlink && deleteproductlink.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete productlink successfully', deleteproductlinkId: productlinkId });
        } else {
            res.status(404).json({ error: 'productlink not found' });
        }


    } catch (error) {
        console.error('Error deleting productlink:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProductLink = async (req, res) => {
    try {
        const productlinkId = req.params.id;
        const { idlink, idproduct, idclassify, idsize } = req.query;

        const checkProductLinkQuery = `SELECT * FROM "productLink" WHERE id = ${productlinkId}`;
        const existingProductLink = await executeQuery(checkProductLinkQuery);

        if (!existingProductLink || existingProductLink.length === 0) {
            return res.status(404).json({ error: 'productlink not found' });
        }

        const updateQuery = `
            UPDATE "productLink" SET idLink = '${idlink}', idproduct = '${idproduct}', idclassify = '${idclassify}', idsize = '${idsize}' WHERE id = ${productlinkId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'productlink updated successfully', updatedProductlinkId: productlinkId, idlink: idlink, idproduct: idproduct, idclassify: idclassify, idsize: idsize });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedProductlinkId: productlinkId });
        }

    } catch (error) {
        console.error('Error updating productlink:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getProductLink, createProductLink, deleteProductLink, updateProductLink, getProductLinkById
};