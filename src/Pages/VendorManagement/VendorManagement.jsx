import {useState} from 'react'
import VendorManagementSubHeader from '../../Components/VendorManagement/VendorSubHeader'
import VendorManagementTiles from '../../Components/VendorManagement/VendorManagementTiles'
import AddNewVendorManagementForm from '../../Components/VendorManagement/AddNewVendorManagement'

const VendorManagement = () => {
  const [page, showForm]= useState(0)
  const toggleNewForm = () => {
    showForm(page === 1 ? 0 : 1);
  };
  return (
    <div>
      <VendorManagementSubHeader showForm={toggleNewForm}/>
      {page===0?( <VendorManagementTiles/>):(< AddNewVendorManagementForm page={page} showForm={showForm}/>)}
      
      
    </div>
  )
}

export default VendorManagement
