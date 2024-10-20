import React, { useState } from 'react'
import VendorCatTiles from '../../Components/VendorCategory/VendorCatTiles'
import VendorSubHeader from '../../Components/VendorCategory/VendorCatgeorySubHeader'
import { AddNewCat } from '../../Components/VendorCategory/AddNewCat'

const VendorCategory = () => {
  const [page, showForm]= useState(0)
  const toggleNewForm = () => {
    showForm(page === 1 ? 0 : 1);
  };
  return (
    <div>
     
      <VendorSubHeader showForm={toggleNewForm}/>

      {page===0?( <VendorCatTiles/>):(<AddNewCat page={page} showForm={showForm}/>)}
     
      
    </div>
  )
}

export default VendorCategory
