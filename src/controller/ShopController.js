const { executeQuery } = require('../database');

const getShop = async (req, res) => {
    try {
        const query = 'SELECT * FROM "shop"';
        const shopData = await executeQuery(query);

        res.status(200).json(shopData);
    } catch (error) {
        console.error('Error getting shop data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createShop = async (req, res) => {
    try {
        const { idplatform, idproduct, idclassify, idsize } = req.query;

        const query = `
            INSERT INTO "shop" ( idplatform, idproduct, idclassify, idsize) 
            VALUES ('${idplatform}', '${idproduct}', '${idclassify}', '${idsize}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'shop created successfully',
        });
    } catch (error) {
        console.error('Error creating shop:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getShopById = async (req, res) => {
    try {
        const shopId = req.params.id;

        const query = `
            SELECT * FROM "shop" WHERE id = ${shopId}
        `;

        const shopData = await executeQuery(query);

        if (shopData.length > 0) {
            res.status(200).json(shopData[0]);
        } else {
            res.status(404).json({ error: 'shop not found' });
        }
    } catch (error) {
        console.error('Error getting shop by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteShop = async (req, res) => {
    try {
        const shopId = req.params.id;

        const deleteQuery = `
            DELETE FROM "shop" WHERE id = ${shopId}
        `;

        const deleteshop = await executeQuery(deleteQuery, true);

        if (deleteshop && deleteshop.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete shop successfully', deleteshopId: shopId });
        } else {
            res.status(404).json({ error: 'shop not found' });
        }


    } catch (error) {
        console.error('Error deleting shop:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateShop = async (req, res) => {
    try {
        const shopId = req.params.id;
        const { idplatform, idproduct, idclassify, idsize } = req.query;

        const checkShopQuery = `SELECT * FROM "shop" WHERE id = ${shopId}`;
        const existingShop = await executeQuery(checkShopQuery);

        if (!existingShop || existingShop.length === 0) {
            return res.status(404).json({ error: 'shop not found' });
        }

        const updateQuery = `
            UPDATE "shop" SET idplatform = '${idplatform}', idproduct = '${idproduct}', idclassify = '${idclassify}', idsize = '${idsize}' WHERE id = ${shopId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'shop updated successfully', updatedShopId: shopId, idplatform: idplatform, idproduct: idproduct, idclassify: idclassify, idsize: idsize });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedShopId: shopId });
        }

    } catch (error) {
        console.error('Error updating shop:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getShop, createShop, deleteShop, updateShop, getShopById
};