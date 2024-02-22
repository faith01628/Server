const { executeQuery } = require('../database');

const getInExPortStorage = async (req, res) => {
    try {
        const query = 'SELECT * FROM "inExPortStorage"';
        const InExPortStorageData = await executeQuery(query);

        res.status(200).json(InExPortStorageData);
    } catch (error) {
        console.error('Error getting InExPortStorage data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createInExPortStorage = async (req, res) => {
    try {
        const { idStorage, idproduct, idclassify, idsize, datePort, quantity, transactionType } = req.query;

        const idUser = req.user.id;

        const query = `
            INSERT INTO "inExPortStorage" (idStorage, idUser, idproduct, idclassify, idsize, datePort, quantity, transactionType) 
            VALUES ('${idStorage}', ${idUser}, ${idproduct}, ${idclassify}, ${idsize}, '${datePort}', ${quantity}, '${transactionType}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'InExPortStorage created successfully',
        });
    } catch (error) {
        console.error('Error creating InExPortStorage:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const getInExPortStorageById = async (req, res) => {
    try {
        const InExPortStorageId = req.params.id;

        const query = `
            SELECT * FROM "inExPortStorage" WHERE id = ${InExPortStorageId}
        `;

        const InExPortStorageIdData = await executeQuery(query);

        if (InExPortStorageIdData.length > 0) {
            res.status(200).json(InExPortStorageIdData[0]);
        } else {
            res.status(404).json({ error: 'InExPortStorageIdData not found' });
        }
    } catch (error) {
        console.error('Error getting InExPortStorageIdData by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteInExPortStorage = async (req, res) => {
    try {
        const InExPortStorageId = req.params.id;

        const deleteQuery = `
            DELETE FROM "inExPortStorage" WHERE id = ${InExPortStorageId}
        `;

        const deletestorge = await executeQuery(deleteQuery, true);

        if (deletestorge && deletestorge.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete InExPortStorage successfully', deleteInExPortStorageId: InExPortStorageId });
        } else {
            res.status(404).json({ error: 'InExPortStorage not found' });
        }


    } catch (error) {
        console.error('Error deleting InExPortStorage:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateInExPortStorage = async (req, res) => {
    try {
        const InExPortStorageId = req.params.id;
        const { idStorage, idUser, idproduct, idclassify, idsize, datePort, quantity, transactionType } = req.query;

        const checkInExPortStorageQuery = `SELECT * FROM "inExPortStorage" WHERE id = ${InExPortStorageId}`;
        const existingInExPortStorage = await executeQuery(checkInExPortStorageQuery);

        if (!existingInExPortStorage || existingInExPortStorage.length === 0) {
            return res.status(404).json({ error: 'InExPortStorage not found' });
        }

        const updateQuery = `
            UPDATE "inExPortStorage" SET idStorage = '${idStorage}', idUser = '${idUser}', idproduct = '${idproduct}', idclassify = '${idclassify}', idsize = '${idsize}', datePort = '${datePort}', quantity = '${quantity}', transactionType = '${transactionType}' WHERE id = ${InExPortStorageId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'InExPortStorage updated successfully', updatedInExPortStorageId: InExPortStorageId, idStorage: idStorage, idUser: idUser, idproduct: idproduct, idclassify: idclassify, idsize: idsize, datePort: datePort, quantity: quantity, transactionType: transactionType });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedInExPortStorageId: InExPortStorageId });
        }

    } catch (error) {
        console.error('Error updating InExPortStorage:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getInExPortStorage, createInExPortStorage, deleteInExPortStorage, updateInExPortStorage, getInExPortStorageById
};