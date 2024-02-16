const { executeQuery } = require('../database');

const getSize = async (req, res) => {
    try {
        const query = 'SELECT * FROM "size"';
        const sizeData = await executeQuery(query);

        res.status(200).json(sizeData);
    } catch (error) {
        console.error('Error getting size data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createSize = async (req, res) => {
    try {
        const { sizeName } = req.query;

        const query = `
            INSERT INTO "size" (sizeName)
            VALUES ('${sizeName}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'Size created successfully',
        });
    } catch (error) {
        console.error('Error creating size:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const deleteSize = async (req, res) => {
    try {
        const sizeId = req.params.id;

        const deleteQuery = `
            DELETE FROM "size" WHERE id = ${sizeId}
        `;

        const deletesize = await executeQuery(deleteQuery, true);

        if (deletesize && deletesize.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete size successfully', deleteSizeId: sizeId });
        } else {
            res.status(404).json({ error: 'User not found' });
        }


    } catch (error) {
        console.error('Error deleting size:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSize = async (req, res) => {
    try {
        const sizeId = req.params.id;
        const { sizeName } = req.query;

        const checkSizerQuery = `SELECT * FROM "size" WHERE id = ${sizeId}`;
        const existingSize = await executeQuery(checkSizerQuery);

        if (!existingSize || existingSize.length === 0) {
            return res.status(404).json({ error: 'size not found' });
        }

        const updateQuery = `
            UPDATE "size" SET sizeName = '${sizeName}' WHERE id = ${sizeId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'size updated successfully', updatedSizeId: sizeId, size: size });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedSizeId: sizeId });
        }

    } catch (error) {
        console.error('Error updating size:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getSize, createSize, deleteSize, updateSize,
};