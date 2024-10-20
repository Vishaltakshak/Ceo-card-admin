import BookingManagement from "../Pages/BookingManagement/BookingManagement.jsx"
import ContentManagement from "../Pages/ContentManagement/ContentManagement.jsx"
import DashBoard from "../Pages/DashBoard/DashBoard.jsx"
import InventoryManagement from "../Pages/InventoryManagement/InventoryManagement.jsx"
import RoleManagement from "../Pages/RoleManagement/RoleManagement.jsx"
import ServiceProviders from "../Pages/ServiceProviders/ServiceProviders.jsx"
import UserPage from "../Pages/User/UserPage.jsx"
import VendorCategory from "../Pages/VendorCategory/VendorCategory.jsx"
import VendorManagement from "../Pages/VendorManagement/VendorManagement.jsx"
import VendorSubCategory from "../Pages/VendorSubCategory/VendorSubCategory.jsx"
import '../css/MainSection.css'

export const MainSection= ({active}) => {
    const displayData = ()=>{
        switch(active){
            case 1:
                return <DashBoard/>
            case 2:
                return <UserPage/>
            // case 3:
            //     return <RoleManagement/>
            case 4:
                return <VendorCategory/>
            case 5:
                return <VendorSubCategory/>
            case 6:
                return <ServiceProviders/>
            case 7:
                    return <VendorManagement/>
            case 8:
                        return <BookingManagement/>
            case 9:
                return <InventoryManagement/>
            case 10:
                return <ContentManagement/>
            default: <DashBoard/>
        }

    }
  return (
    <main className='mainSection'>
        
        {displayData()}   
    </main>
  )
}