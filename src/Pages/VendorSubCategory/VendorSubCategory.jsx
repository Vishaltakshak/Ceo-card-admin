import React,{useState} from 'react'
import SubCatTiles from '../../Components/VendorSubCategory/SubCatTiles'
import VendorSubCatHeader from '../../Components/VendorSubCategory/SubCatHeader'
import AddNewSubCat from '../../Components/VendorSubCategory/AddNewSubCat'


const VendorSubCategory = () => {
  const [page, showForm]= useState(0)
  const toggleNewForm = () => {
    showForm(page === 1 ? 0 : 1);
  };
  return (
    <div>
      <VendorSubCatHeader showForm={toggleNewForm}/>
      {page===0?(<SubCatTiles/> ):(<AddNewSubCat page={page} showForm={showForm}/>)}
      
      
    </div>
  )
}

export default VendorSubCategory
