const { executeQuery } = require('../database');
// const User = require('../models/User');

const getUserData = async (req, res) => {
    try {
        const query = 'SELECT * FROM "user"';
        const userData = await executeQuery(query);

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, username, password, email, role, avata } = req.query;

        // Sử dụng câu truy vấn SQL với tham số để thêm user mới vào cơ sở dữ liệu
        const query = `
            INSERT INTO "user" (name, username, password, email, role, avata)
            VALUES ('${name}', '${username}', '${password}', '${email}', '${role}', '${avata}')
        `;

        // Thực hiện câu truy vấn bằng hàm executeQuery (đã được định nghĩa trước đó)
        await executeQuery(query);

        // Trả về thông báo thành công nếu không có lỗi
        res.status(201).json({ message: 'User created successfully', name: name, username: username, password: password, email: email, role: role, avata: avata });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Thực hiện câu truy vấn SQL để lấy thông tin của người dùng dựa trên userId
        const query = `
            SELECT * FROM "user" WHERE id = ${userId}
        `;

        // Thực hiện câu truy vấn bằng hàm executeQuery (đã được định nghĩa trước đó)
        const userData = await executeQuery(query);

        console.log(userData)

        if (userData.length > 0) {
            res.status(200).json(userData[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Thực hiện câu truy vấn SQL để xóa người dùng dựa trên userId
        const query = `
            DELETE FROM "user" WHERE id = ${userId}
        `;

        // Thực hiện câu truy vấn bằng hàm executeQuery (đã được định nghĩa trước đó)
        const deleteuser = await executeQuery(query);

        console.log(deleteuser)

        if (deleteuser !== undefined && deleteuser !== null && deleteuser.affectedRows > 0) {
            res.status(204).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }


    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, username, password, email, role, avata } = req.query;

        // Kiểm tra xem người dùng có tồn tại không
        const checkUserQuery = `SELECT * FROM "user" WHERE id = ${userId}`;
        const existingUser = await executeQuery(checkUserQuery);

        if (!existingUser || existingUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Thực hiện câu truy vấn SQL để cập nhật thông tin người dùng
        const updateQuery = `
            UPDATE "user"
            SET name = '${name}', username = '${username}', password = '${password}', 
                email = '${email}', role = '${role}', avata = '${avata}'
            WHERE id = ${userId}
        `;

        // Thực hiện truy vấn cập nhật
        const updateuser = await executeQuery(updateQuery);

        console.log(updateuser)

        if (updateuser !== undefined && updateuser !== null && updateuser.affectedRows > 0) {
            res.status(200).json({ message: 'User updated successfully', updatedUserId: userId });
        } else {
            res.status(500).json({ error: 'Update was not successful', updatedUserId: userId });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getUserData, createUser, getUserById, deleteUser, updateUser,
};
