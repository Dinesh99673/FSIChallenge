import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJ0aW1lIjoiMjAyNS0wNi0yNlQwMzo0OTo1Ny43NTJaIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTA5MDk3OTd9.2NMIoN7UKNYtEcyAYHNnUsSNdUXRUyX80EXQTpjtCI0'

export const getStoreRatings = async () => {
    try{
        const data = await axios.get('http://localhost:5000/user/user-ratings', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        console.log(data.data);
        return data.data;       
    }catch(error){
        console.log(error);1        
    }
}

export const updateRating = async (store) => {
    try{
        axios.post('http://localhost:5000/user/update-rating', store, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
        });
    }catch(error){
        console.log(error);
    }
}