import React, { useEffect, useState } from "react";
import useApi from "../../useApi/useApi";

export default function VendorSubCategoryUpdateForm({ onCancel, subCat }) {
  const [maincat, setMainCat] = useState([]); // Stores main categories
  const { findData, updateData, fetchData } = useApi();
  const [loading, setLoading] = useState(true);
  // const [subCat, setSubCat]=useState([])
  const [formData, setFormData] = useState({
    SubCategoryName: "",
    MainCategory: "BUSINESS",
    SubCategoryTitle: "",
    Description: "",
    Status: "Active",
  });

  useEffect(() => {
    const fetchSubCategoryData = async () => {
      try {
        const response = await findData("Nav/hover/view", subCat._id);
        fetchMainCat(); // Fetch main categories

        if (response.data.Users) {
          const data = response.data.Users;
          setFormData({
            SubCategoryName: data.SubCategoryName || "",
            Description: data.Description || "",
            Status: data.Status || "Active",
            SubCategoryTitle: data.SubCategoryTitle || "",
            MainCategory: data.MainCategory || "BUSINESS", // Default to BUSINESS if not present
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // const fetchSubCat=async()=>{
    //   const response = await fetchData('subnav/link/view');
    //   const data = response.data.Data;

    // }

    const fetchMainCat = async () => {
      try {
        const response = await fetchData("NavBar/view");
        const data = response.data.Data;
        if (Array.isArray(data) && data.length > 0) {
          setMainCat(data.map((item) => item.CategoryName)); // Set categories
        }
      } catch (error) {
        console.error("Error fetching main categories:", error);
      }
    };

    fetchSubCategoryData();
  }, [subCat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.SubCategoryName || !formData.SubCategoryTitle) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await updateData("Nav/hover/update", subCat._id, formData);
      console.log("Category updated successfully");
      onCancel(); // Close the form after submission
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      SubCategoryName: "",
      MainCategory: "BUSINESS",
      SubCategoryTitle: "",
      Description: "",
      Status: "Active",
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  return (
    <div className="bg-white shadow-md rounded-lg max-w-3xl mx-auto mt-10">
      <div className="bg-blue-500 text-white py-4 px-6 rounded-t-lg">
        <h2 className="text-2xl font-semibold">Enter Sub Category Details</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="SubCategoryName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              SubCategory Name
            </label>
            <input
              type="text"
              id="SubCategoryName"
              name="SubCategoryName"
              value={formData.SubCategoryName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="MainCategory"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Main Category
            </label>
            <select
              id="MainCategory"
              name="MainCategory"
              value={formData.MainCategory}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              {maincat.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="SubCategoryTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              SubCategory Title
            </label>
            <input
              type="text"
              id="SubCategoryTitle"
              name="SubCategoryTitle"
              value={formData.SubCategoryTitle}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="Status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="Status"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="Description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="Description"
            name="Description"
            rows={3}
            value={formData.Description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div className="flex justify-start space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
