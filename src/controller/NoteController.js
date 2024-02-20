const { executeQuery } = require('../database');

const getNote = async (req, res) => {
    try {
        const query = 'SELECT * FROM "note"';
        const noteData = await executeQuery(query);

        res.status(200).json(noteData);
    } catch (error) {
        console.error('Error getting note data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createNote = async (req, res) => {
    try {
        const { note, idproduct, idclassify, idsize } = req.query;

        const query = `
            INSERT INTO "note" ( note, idproduct, idclassify, idsize) 
            VALUES ('${note}', '${idproduct}', '${idclassify}', '${idsize}')
        `;

        await executeQuery(query);

        res.status(201).json({
            message: 'note created successfully',
        });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;

        const query = `
            SELECT * FROM "note" WHERE id = ${noteId}
        `;

        const noteData = await executeQuery(query);

        if (noteData.length > 0) {
            res.status(200).json(noteData[0]);
        } else {
            res.status(404).json({ error: 'note not found' });
        }
    } catch (error) {
        console.error('Error getting note by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        const deleteQuery = `
            DELETE FROM "note" WHERE id = ${noteId}
        `;

        const deletenote = await executeQuery(deleteQuery, true);

        if (deletenote && deletenote.rowsAffected > 0) {
            res.status(200).json({ message: 'Delete note successfully', deletenoteId: noteId });
        } else {
            res.status(404).json({ error: 'note not found' });
        }


    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { note, idproduct, idclassify, idsize } = req.query;

        const checkNoteQuery = `SELECT * FROM "note" WHERE id = ${noteId}`;
        const existingNote = await executeQuery(checkNoteQuery);

        if (!existingNote || existingNote.length === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const updateQuery = `
            UPDATE "note" SET note = '${note}', idproduct = '${idproduct}', idclassify = '${idclassify}', idsize = '${idsize}' WHERE id = ${noteId}
        `;

        const updateResult = await executeQuery(updateQuery, true);

        if (updateResult && updateResult.rowsAffected > 0) {
            res.status(200).json({ message: 'note updated successfully', updatedNoteId: noteId, note: note, idproduct: idproduct, idclassify: idclassify, idsize: idsize });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedNoteId: noteId });
        }

    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getNote, createNote, deleteNote, updateNote, getNoteById
};