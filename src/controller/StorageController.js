const { executeQuery } = require('../database');

const getStorage = async (req, res) => {
    try {
        const query = 'SELECT * FROM "storage"';
        const storageData = await executeQuery(query);

        res.status(200).json(storageData);
    } catch (error) {
        console.error('Error getting storage data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createStorage = async (req, res) => {
    try {
        const { idproduct, idclassify, idsize, remainingQuantity } = req.query;

        const query = `
            INSERT INTO "storage" ( idproduct, idclassify, idsize, remainingQuantity ) 
            VALUES ( '${idproduct}', '${idclassify}', '${idsize}', '${remainingQuantity}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'storage created successfully',
        });
    } catch (error) {
        console.error('Error creating storage:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getStorageById = async (req, res) => {
    try {
        const storageId = req.params.id;

        const query = `
            SELECT * FROM "storage" WHERE id = ${storageId}
        `;

        const storageIdData = await executeQuery(query);

        if (storageIdData.length > 0) {
            res.status(200).json(storageIdData[0]);
        } else {
            res.status(404).json({ error: 'storageIdData not found' });
        }
    } catch (error) {
        console.error('Error getting storageIdData by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteStorage = async (req, res) => {
    try {
        const storageId = req.params.id;

        const deleteQuery = `
            DELETE FROM "storage" WHERE id = ${storageId}
        `;

        const deletestorge = await executeQuery(deleteQuery, true);

        if (deletestorge && deletestorge.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete storage successfully', deletestorageId: storageId });
        } else {
            res.status(404).json({ error: 'storage not found' });
        }


    } catch (error) {
        console.error('Error deleting storage:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateStorage = async (req, res) => {
    try {
        const storageId = req.params.id;
        const { idproduct, idclassify, idsize, remainingQuantity } = req.query;

        const checkStorageQuery = `SELECT * FROM "storage" WHERE id = ${storageId}`;
        const existingStorage = await executeQuery(checkStorageQuery);

        if (!existingStorage || existingStorage.length === 0) {
            return res.status(404).json({ error: 'storage not found' });
        }

        const updateQuery = `
            UPDATE "storage" SET idproduct = '${idproduct}', idclassify = '${idclassify}', idsize = '${idsize}', remainingQuantity = '${remainingQuantity}' WHERE id = ${storageId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'storage updated successfully', updatedstorageId: storageId, idproduct: idproduct, idclassify: idclassify, idsize: idsize, remainingQuantity: remainingQuantity, });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedstorageId: storageId });
        }

    } catch (error) {
        console.error('Error updating storage:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getStorage, createStorage, deleteStorage, updateStorage, getStorageById
};