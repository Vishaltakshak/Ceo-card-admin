import {useState} from 'react'
import InventorySubHeader from '../../Components/InventoryManagement/InventorySubHeader'
import InventoryTiles from '../../Components/InventoryManagement/InventoryTiles'
import AddNewInventoryForm from '../../Components/InventoryManagement/AddNewInventory'

const InventoryManagement = () => {
  const [page, showForm]= useState(0)
  const toggleNewForm = () => {
    showForm(page === 1 ? 0 : 1);
  };
  return (
    <div>
      <InventorySubHeader showForm={toggleNewForm}/>
      {page===0?( <InventoryTiles />):(<AddNewInventoryForm page={page} showForm={showForm}/>)}
     
      
    </div>
  )
}

export default InventoryManagement
