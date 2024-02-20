const { executeQuery } = require('../database');

const getPrice = async (req, res) => {
    try {
        const query = 'SELECT * FROM "price"';
        const priceData = await executeQuery(query);

        res.status(200).json(priceData);
    } catch (error) {
        console.error('Error getting pice data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createPrice = async (req, res) => {
    try {
        const { wholesalePrice, price, idproduct, idclassify, idsize } = req.query;

        const query = `
            INSERT INTO "price" (wholesaleprice, price, idproduct, idclassify, idsize) 
            VALUES ('${wholesalePrice}', '${price}', '${idproduct}', '${idclassify}', '${idsize}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'Price created successfully',
        });
    } catch (error) {
        console.error('Error creating price:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getPriceById = async (req, res) => {
    try {
        const priceId = req.params.id;

        const query = `
            SELECT * FROM "price" WHERE id = ${priceId}
        `;

        const priceData = await executeQuery(query);

        if (priceData.length > 0) {
            res.status(200).json(priceData[0]);
        } else {
            res.status(404).json({ error: 'price not found' });
        }
    } catch (error) {
        console.error('Error getting price by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deletePrice = async (req, res) => {
    try {
        const priceId = req.params.id;

        const deleteQuery = `
            DELETE FROM "price" WHERE id = ${priceId}
        `;

        const deleteprice = await executeQuery(deleteQuery, true);

        if (deleteprice && deleteprice.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete price successfully', deletepriceId: priceId });
        } else {
            res.status(404).json({ error: 'price not found' });
        }


    } catch (error) {
        console.error('Error deleting size:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePrice = async (req, res) => {
    try {
        const priceId = req.params.id;
        const { wholesalePrice, price, idproduct, idclassify, idsize } = req.query;

        const checkPriceQuery = `SELECT * FROM "price" WHERE id = ${priceId}`;
        const existingPrice = await executeQuery(checkPriceQuery);

        if (!existingPrice || existingPrice.length === 0) {
            return res.status(404).json({ error: 'price not found' });
        }

        const updateQuery = `
            UPDATE "price" SET wholesalePrice = '${wholesalePrice}', price = '${price}', idproduct = '${idproduct}', idclassify = '${idclassify}', idsize = '${idsize}' WHERE id = ${priceId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'price updated successfully', updatedPriceId: priceId, wholesalePrice: wholesalePrice, price: price, idproduct: idproduct, idclassify: idclassify, idsize: idsize });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedPriceId: priceId });
        }

    } catch (error) {
        console.error('Error updating price:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getPrice, createPrice, deletePrice, updatePrice, getPriceById
};