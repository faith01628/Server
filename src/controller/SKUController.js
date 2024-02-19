const { executeQuery } = require('../database');

const getSKU = async (req, res) => {
    try {
        const query = 'SELECT * FROM "SKU"';
        const SKUData = await executeQuery(query);

        res.status(200).json(SKUData);
    } catch (error) {
        console.error('Error getting SKU data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createSKU = async (req, res) => {
    try {
        const { SKU } = req.query;

        const query = `
            INSERT INTO "SKU" ( sku )
            VALUES ('${SKU}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'SKU created successfully',
        });
    } catch (error) {
        console.error('Error creating SKU:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getSKUById = async (req, res) => {
    try {
        const skuId = req.params.id;

        const query = `
            SELECT * FROM "SKU" WHERE id = ${skuId}
        `;

        const SKUData = await executeQuery(query);

        if (SKUData.length > 0) {
            res.status(200).json(SKUData[0]);
        } else {
            res.status(404).json({ error: 'SKU not found' });
        }
    } catch (error) {
        console.error('Error getting SKU by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteSKU = async (req, res) => {
    try {
        const skuId = req.params.id;

        const deleteQuery = `
            DELETE FROM "SKU" WHERE id = ${skuId}
        `;

        const deleteSKU = await executeQuery(deleteQuery, true);

        if (deleteSKU && deleteSKU.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete SKU successfully', deleteSKU: skuId });
        } else {
            res.status(404).json({ error: 'SKU not found' });
        }


    } catch (error) {
        console.error('Error deleting SKU:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSKU = async (req, res) => {
    try {
        const skuId = req.params.id;
        const { SKU } = req.query;

        const checkSKUQuery = `SELECT * FROM "SKU" WHERE id = ${skuId}`;
        const existingSKU = await executeQuery(checkSKUQuery);

        if (!existingSKU || existingSKU.length === 0) {
            return res.status(404).json({ error: 'SKU not found' });
        }

        const updateQuery = `
            UPDATE "SKU" SET SKU = '${SKU}' WHERE id = ${skuId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'SKU updated successfully', updatedLinkId: skuId, SKU: SKU });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedLinkId: skuId });
        }

    } catch (error) {
        console.error('Error updating SKU:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getSKU, createSKU, deleteSKU, updateSKU, getSKUById
};