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
    },
    idProduct: {
        type: DataTypes.INTEGER, // Thay đổi từ STRING thành INTEGER nếu idProduct là khóa ngoại của bảng sản phẩm
        allowNull: false,
    },
    idClassify: {
        type: DataTypes.INTEGER, // Thay đổi từ STRING thành INTEGER nếu idClassify là khóa ngoại của bảng phân loại
        allowNull: false,
    }
});

module.exports = Size;
