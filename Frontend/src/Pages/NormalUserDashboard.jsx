import { useEffect } from "react";
import { getStoreRatings, updateRating } from "../Services/storeService";
import { useState } from "react";

export default function NormalUserDashboard() {
  const [stores,setStores] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStoreRatings();
      console.log('Raw Response:', data);
      setStores(data.data); 
    };

    fetchData();
  }, []);

  
  const editRating = async (store) =>{
    let rating = prompt("Enter New rating")
    if (rating<1 || rating >5){
      alert("Rating should be in between 1-to-5 !!")
      return
    }
    console.log(store);
    let flag = await updateRating(store)
  } 

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow rounded">
        <div className="flex justify-between items-center bg-blue-900 text-white px-6 py-4 rounded-t">
          <h1 className="text-2xl font-bold">Store Ratings</h1>
          <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-blue-900">Log Out</button>
        </div>

        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name"
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Search by address"
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <button className="bg-blue-900 text-white px-4 py-2 rounded mb-6">Search</button>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Store Name</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">Overall Rating</th>
                  <th className="py-2 px-4">User's Submitted Rating</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(stores) && stores.map((store, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{store.store_name}</td>
                    <td className="py-2 px-4">{store.store_address}</td>
                    <td className="py-2 px-4">
                      {store.overall_rating ? (
                        <span>{'★'.repeat((store.overall_rating))}</span>
                      ) : (
                        'No ratings'
                      )}
                    </td>
                    <td className="py-2 px-4">{store.user_rating || 'NA'}</td>
                    <td className="py-2 px-4">
                      {store.user_rating ? (
                        <button className="border px-4 py-1 rounded hover:bg-gray-100" onClick={()=> editRating(store)}>Edit Rating</button>
                      ) : (
                        <button className="bg-blue-900 text-white px-4 py-1 rounded hover:bg-blue-800" >Submit Rating</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
