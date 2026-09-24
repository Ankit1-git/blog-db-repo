import pool from "../config/db.js";

export const createUser = async (name, email, hashedPassword,role) => {
    const query = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, hashedPassword, role];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getAllUsers = async () => {
    const query = "SELECT name, email,role, profile_image FROM users";
    const result = await pool.query(query);
    return result.rows;
};

export const getUserById=async(id)=>{
    const query="SELECT * FROM users WHERE id=$1"
    const result=await pool.query(query,[id])
    return result.rows[0]
}
export const getUserbyMail=async(email)=>{
    const query="SELECT email FROM users WHERE email=$1"
    const result=await pool.query(query,[email])
    return result.rows[0]
}

export const deleteUser = async (id) => {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

export const updateUser = async (id, name, email, profile_image,role) => {
    const query = "UPDATE users SET name = $1, email = $2, profile_image = $3,role=$4 WHERE id = $4 RETURNING *";
    const values = [id,name, email, profile_image,role];
    const result = await pool.query(query, values);
    return result.rows[0];
};