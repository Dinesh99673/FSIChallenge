import pool from '../index.js';


// Fetch a user by their email
export const getUserById = async (user_id) => {
  const res = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [user_id]
  );
  return res.rows[0];
};

// Fetch a user by their email
export const getUserByEmail = async (email) => {
  const res = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return res.rows[0];
};

// Create a new user in the database
export const createUser = async (user) => {
  try {
    await pool.query(
        'INSERT INTO users(role,name,addr,email,hashed_password) VALUES($1, $2, $3, $4, $5)',
      [user.role, user.name, user.addr, user.email, user.hashed_password]
    );
    return { msg: 'User Account created', code: 200 };
  } catch (error) {
    return { msg: 'Something went wrong!! Cannot insert data.', code: 500 };
  }
};

//Update User password
export const resetPassword = async (user) => {
  try {
    await pool.query(
        'UPDATE users SET hashed_password = $1 WHERE id = $2',
      [user.hashedNewPassword, user.userId]
    );
    return { msg: 'User Password updated successfully', code: 200 };
  } catch (error) {
    console.log(error);    
    return { msg: 'Something went wrong!! Cannot Reset password.', code: 500 };
  }    
}