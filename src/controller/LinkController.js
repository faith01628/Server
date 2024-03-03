const { executeQuery } = require('../database');

const getLink = async (req, res) => {
    try {
        const query = 'SELECT * FROM "link"';
        const linkData = await executeQuery(query);

        res.status(200).json(linkData);
    } catch (error) {
        console.error('Error getting link data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createLink = async (req, res) => {
    try {
        const { link } = req.query;

        const query = `
            INSERT INTO "link" (link )
            VALUES ('${link}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'Link created successfully',
        });
    } catch (error) {
        console.error('Error creating link:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getLinkById = async (req, res) => {
    try {
        const linkId = req.params.id;

        const query = `
            SELECT * FROM "link" WHERE id = ${linkId}
        `;

        const linkData = await executeQuery(query);

        if (linkData.length > 0) {
            res.status(200).json(linkData[0]);
        } else {
            res.status(404).json({ error: 'link not found' });
        }
    } catch (error) {
        console.error('Error getting link by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteLink = async (req, res) => {
    try {
        const linkId = req.params.id;

        const deleteQuery = `
            DELETE FROM "link" WHERE id = ${linkId}
        `;

        const deletelink = await executeQuery(deleteQuery, true);

        if (deletelink && deletelink.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete link successfully', deletelink: linkId });
        } else {
            res.status(404).json({ error: 'link not found' });
        }


    } catch (error) {
        console.error('Error deleting link:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateLink = async (req, res) => {
    try {
        const linkId = req.params.id;
        const { link } = req.query;

        const checkLinkQuery = `SELECT * FROM "link" WHERE id = ${linkId}`;
        const existingLink = await executeQuery(checkLinkQuery);

        if (!existingLink || existingLink.length === 0) {
            return res.status(404).json({ error: 'link not found' });
        }

        const updateQuery = `
            UPDATE "link" SET link = '${link}' WHERE id = ${linkId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'link updated successfully', updatedLinkId: linkId, link: link });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedLinkId: linkId });
        }

    } catch (error) {
        console.error('Error updating link:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getLink, createLink, deleteLink, updateLink, getLinkById
};