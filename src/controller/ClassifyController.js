const { executeQuery } = require('../database');

const getClassify = async (req, res) => {
    try {
        const query = 'SELECT * FROM "classify"';
        const classifyData = await executeQuery(query);

        res.status(200).json(classifyData);
    } catch (error) {
        console.error('Error getting classify data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createClassify = async (req, res) => {
    try {
        const { classificationName, image, material, idproduct } = req.query;

        idproduct = idproduct || null;

        const query = `
            INSERT INTO "classify" (classificationName, image, material, idProduct)
            VALUES ('${classificationName}', '${image}', '${material}', '${idproduct}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'classify created successfully',
        });
    } catch (error) {
        console.error('Error creating classify:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getClassifyById = async (req, res) => {
    try {
        const classifyId = req.params.id;

        const query = `
            SELECT * FROM "classify" WHERE id = ${classifyId}
        `;

        const classifyData = await executeQuery(query);

        if (classifyData.length > 0) {
            res.status(200).json(classifyData[0]);
        } else {
            res.status(404).json({ error: 'classify not found' });
        }
    } catch (error) {
        console.error('Error getting product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteClassify = async (req, res) => {
    try {
        const classifyId = req.params.id;

        const deleteQuery = `
            DELETE FROM "classify" WHERE id = ${classifyId}
        `;

        const deleteclassify = await executeQuery(deleteQuery, true);

        if (deleteclassify && deleteclassify.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete classify successfully', deleteclassifyId: classifyId });
        } else {
            res.status(404).json({ error: 'classify not found' });
        }


    } catch (error) {
        console.error('Error deleting classify:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateClassify = async (req, res) => {
    try {
        const classifyId = req.params.id;
        const { classificationName, image, material, idproduct } = req.query;

        const checkClassifyrQuery = `SELECT * FROM "classify" WHERE id = ${classifyId}`;
        const existingClassify = await executeQuery(checkClassifyrQuery);

        if (!existingClassify || existingClassify.length === 0) {
            return res.status(404).json({ error: 'classify not found' });
        }

        const updateQuery = `
            UPDATE "classify" 
            SET classificationName = '${classificationName}', image = '${image}', material = '${material}', idProduct = '${idproduct}' WHERE id = ${classifyId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'classify updated successfully', updatedClassifyId: classifyId, classificationName: classificationName, image: image, material: material, idproduct: idproduct });
        } else {
            res.status(500).json({ error: 'Update was not successful', deleteclassifyId: classifyId });
        }

    } catch (error) {
        console.error('Error updating classify:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getClassify, createClassify, deleteClassify, updateClassify, getClassifyById
};