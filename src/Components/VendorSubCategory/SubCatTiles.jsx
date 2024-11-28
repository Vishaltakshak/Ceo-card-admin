import { useEffect } from "react";
import useApi from "../../useApi/useApi";
import { useState } from "react";
import SubCatTile from "./SubCatTile";

const SubCatTiles = () => {
  const { data: loading, error, fetchData, deleteData } = useApi();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getSubCat();
  }, []);

  const getSubCat = async () => {
    try {
      const response = await fetchData("Nav/hover/view");
      setUsers(response.data.Data || []);
     
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  const DeleteData = async (id) => {
    try {
      await deleteData("Nav/hover/delete", id); // Await the delete operation
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Filter out the deleted user
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center text-left  font-semibold text-gray-700">
          <div className=" w-1/6 flex-1 p-3">Sub Category Name</div>
          <div className=" p-3 w-11/12 mr-5">Description</div>
          <div className="w-24 pl-5">Status</div>
          <div className="w-32 pl-2">Main Category</div>
          <div className="w-28 p-2">Created On</div>
          <div className="w-24 p-3">Actions</div>
        </div>
      </div>
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        users.map((user) => (
          <SubCatTile
            key={user._id}
            subCat={user}
            onUpdate={handleUserUpdate}
            DeleteData={DeleteData}
          />
        ))
      )}
    </div>
  );
};

export default SubCatTiles;
