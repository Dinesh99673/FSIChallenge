import pool from '../index.js';

// Fetch a user by their email
export const getUserRatings = async (user_id) => {
  const res = await pool.query(
    `
        SELECT
        s.id,
        s.store_name ,
        s.addr AS store_address,
        ROUND(AVG(r.rating), 1) AS overall_rating,
        ur.rating AS user_rating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id                           
        LEFT JOIN ratings ur ON s.id = ur.store_id AND ur.user_id = $1    
        GROUP BY s.id, ur.rating
        ORDER BY s.store_name;
    `,
    [user_id]
  );
  return res.rows;
};

export const updateRating = async (storeId, userId, newRating) =>{
    try{
        const res = await pool.query(
            `
                UPDATE ratings SET rating = $1 WHERE store_id = $2 AND user_id = $3
            `,
            [newRating, storeId, userId]
        );
          return {code:200, message:"Updated successfully"};
    }catch(error){
        console.log(error);
        return {code:500, message:"Something  went wrong"};
    }

}