const { executeQuery } = require('../database');

const getPlatform = async (req, res) => {
    try {
        const query = 'SELECT * FROM "platform"';
        const platformData = await executeQuery(query);

        res.status(200).json(platformData);
    } catch (error) {
        console.error('Error getting platform data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createPlatform = async (req, res) => {
    try {
        const { platform } = req.query;

        const query = `
            INSERT INTO "platform" (platform )
            VALUES ('${platform}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'Platform created successfully',
        });
    } catch (error) {
        console.error('Error creating platform:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getPlatformById = async (req, res) => {
    try {
        const platformId = req.params.id;

        const query = `
            SELECT * FROM "platform" WHERE id = ${platformId}
        `;

        const platformData = await executeQuery(query);

        if (platformData.length > 0) {
            res.status(200).json(platformData[0]);
        } else {
            res.status(404).json({ error: 'platform not found' });
        }
    } catch (error) {
        console.error('Error getting platform by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deletePlatform = async (req, res) => {
    try {
        const platformId = req.params.id;

        const deleteQuery = `
            DELETE FROM "platform" WHERE id = ${platformId}
        `;

        const deletePlatform = await executeQuery(deleteQuery, true);

        if (deletePlatform && deletePlatform.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete platform successfully', deletePlatform: platformId });
        } else {
            res.status(404).json({ error: 'platform not found' });
        }


    } catch (error) {
        console.error('Error deleting platform:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePlatform = async (req, res) => {
    try {
        const platformId = req.params.id;
        const { platform } = req.query;

        const checkplatformQuery = `SELECT * FROM "platform" WHERE id = ${platformId}`;
        const existingplatform = await executeQuery(checkplatformQuery);

        if (!existingplatform || existingplatform.length === 0) {
            return res.status(404).json({ error: 'platform not found' });
        }

        const updateQuery = `
            UPDATE "platform" SET platform = '${platform}' WHERE id = ${platformId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'platform updated successfully', updatedLinkId: platformId, platform: platform });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedLinkId: platformId });
        }

    } catch (error) {
        console.error('Error updating platform:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getPlatform, createPlatform, deletePlatform, updatePlatform, getPlatformById
};