const { DataTypes } = require('sequelize');
const { sql } = require('../database');

const User = sql.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})
module.exports = User