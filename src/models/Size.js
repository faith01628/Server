const { DataTypes } = require('sequelize');
const { sql } = require('../database');

const Size = sql.define('size', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sizeName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})
module.exports = Size
