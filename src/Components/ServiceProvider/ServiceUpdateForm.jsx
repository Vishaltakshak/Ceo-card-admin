"use client";

import React, { useState, useEffect } from "react";
import useApi from "../../useApi/useApi";

export default function ServiceUpdateForm({
  active,
  setActive,
  handleUpdate,
  navbar,
  onUpdate,
  services,
}) {
  const { findData, updateData, fetchData } = useApi();
  const [servie, setService] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [formData, setFormData] = useState({
    ProviderName: "",
    ContactMail: "",
    ContactNumber: "",
    WebsiteURl: "",
    ServiceCatergory: "",
    SubCategory: "",
    ContentTitle: "",
    ContentDescription: "",
    CardTitle: "",
    CardDescription: "",
    Offer: "",
    Latitude: "",
    Longitude: "",
    Status: "Active",
    BannerIMG: "",
    ServiceIMG: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateData("subnav/link/update", navbar._id, formData); // Update with correct endpoint
      console.log("Category updated successfully");
      onUpdate(formData);
      setActive(0); // Close the form after submission
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      ProviderName: "",
      ContactMail: "",
      ContactNumber: "",
      WebsiteURl: "",
      ServiceCatergory: "",
      SubCategory: "",
      ContentTitle: "",
      ContentDescription: "",
      CardTitle: "",
      CardDescription: "",
      Offer: "",
      Latitude: "",
      Longitude: "",
      Status: "Active",
      BannerIMG: "",
      ServiceIMG: "",
    });
  };

  const [bannerImages, setBannerImages] = useState([]);
  const [serviceImages, setServiceImages] = useState([]);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await findData(`subnav/link/view`, navbar._id);

        if (response.data.Users) {
          setFormData(response.data.Users);
        }

        const ServiceCat = await fetchData("NavBar/view");
        const services = ServiceCat.data.Data;
        if (services) {
          setService(services.map((item) => item.CategoryName));
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }

      const fetchsubCat = await fetchData("Nav/hover/view");
      const subcat = fetchsubCat.data.Data;
      console.log("subcat", subcat);
      if (subcat) {
        const subCategoryNames = subcat.map((e) => e.SubCategoryName);
        setSubCat(subCategoryNames);
      }
    };

    fetchServiceData();
  }, [navbar]);

  const handleImageUpload = (event, setImages) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setActive(0);
    console.log(active);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Enter Vendor Details</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(formData).map(([key, value]) => {
            if (["BannerIMG", "ServiceIMG", "SubCategory"].includes(key))
              return null;
            return (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                {key === "ServiceCatergory" || key === "Status" ? (
                  <select
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {servie.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                ) : key === "ContentDescription" ||
                  key === "CardDescription" ? (
                  <textarea
                    id={key}
                    name={key}
                    rows={4}
                    value={value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <input
                    type={
                      key === "ContactMail"
                        ? "email"
                        : key === "ContactNumber"
                        ? "tel"
                        : key === "WebsiteURl"
                        ? "url"
                        : "text"
                    }
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div>
          <label
            htmlFor="SubCategory"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select SubCategories
          </label>
          <select
            name="SubCategory"
            id="SubCategory"
            value={formData.SubCategory}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a subcategory</option>
            {subCat.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Banner Images/Videos
          </label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, setBannerImages)}
            multiple
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="mt-2 flex space-x-2">
            {bannerImages.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Banner ${index + 1}`}
                className="w-24 h-18 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Images
          </label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, setServiceImages)}
            multiple
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="mt-2 flex space-x-2">
            {serviceImages.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Service ${index + 1}`}
                className="w-24 h-18 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
