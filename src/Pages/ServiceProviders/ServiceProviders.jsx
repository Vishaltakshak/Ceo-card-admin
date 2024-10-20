import { useState } from 'react'
import ServiceSubHeader from '../../Components/ServiceProvider/ServiceSubHeader'
import ServiceProviderTIles from '../../Components/ServiceProvider/ServiceTiles'
import AddNewService from '../../Components/ServiceProvider/AddNewService'

const ServiceProviders = () => {
  const [page, showForm]= useState(0)
  const toggleNewForm = () => {
    showForm(page === 1 ? 0 : 1);
  };
  return (
    <div>
      <ServiceSubHeader showForm={toggleNewForm}/>
      {page===0?( <ServiceProviderTIles/>):(<AddNewService page={page} showForm={showForm}/>)}
     
      
    </div>
  )
}

export default ServiceProviders
