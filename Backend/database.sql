--Users table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    role VARCHAR(12) CHECK(role in ('admin','user','store-owner')) NOT NULL, --to know the role of a user
    name VARCHAR(61) NOT NULL,  --name of user
    addr VARCHAR(400) NOT NULL, --address of user
    email VARCHAR(255) UNIQUE NOT NULL, --email of user with standard length 255
    hashed_password VARCHAR(60) NOT NULL, --storing hashed password whose length is exactly 60 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Demo Insert Command
INSERT INTO users(role,name,addr,email,hashed_password) VALUES('admin','Dinesh Chaudhari', 'Pawna nagar', 'dinesh21@gmail.com', 'Hashed-password') 

--Store table
CREATE TABLE stores(
    id SERIAL PRIMARY KEY,
    store_name VARCHAR(60) NOT NULL, --store name
    addr VARCHAR(400) NOT NULL, --store address
    store_owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE UNIQUE NOT NULL, --Considering each owner has 1 store (1-to-1)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

--Demo Insert Command
INSERT INTO stores(store_name,addr,store_owner) VALUES('Laxmi Traders','Dhawade vasti',1)

--Rating table
CREATE TABLE ratings(
    id SERIAL PRIMARY KEY,
    store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL, --Foreign Key of Store-id
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL, --Foreign Key of User-id
    rating SMALLINT CHECK(rating >= 1 and rating <= 5) NOT NULL, --Rating should be 1-to-5 (Including 1 and 5)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    constraint unique_rating unique (store_id, user_id)
)

--Demo Insert Command
INSERT INTO ratings(store_id,user_id,rating) VALUES(1,1,4)



--Query to get the rating on a store done by user and average rating of the user with store details
SELECT 
s.store_name ,
s.addr AS store_address,
ROUND(AVG(r.rating), 1) AS overall_rating,
ur.rating AS user_rating
FROM stores AS s
LEFT JOIN ratings AS r ON s.id = r.store_id
LEFT JOIN ratings AS ur ON s.id = ur.store_id AND ur.id = $1
GROUP BY s.id, ur.rating
ORDER BY s.store_name;
