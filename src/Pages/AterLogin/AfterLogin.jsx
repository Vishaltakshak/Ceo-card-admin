import {useState} from 'react'
import AsideSection from '../../Components/Aside/Aside'
import { MainSection } from '../../Components/MainSection'
import { Header } from '../../Components/Header/Header'
import { useLocation } from 'react-router-dom';


const AfterLogin = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  console.log("userid of the logged in user is",userId)
    const [active, setActive] = useState(1)
  return (
    <div>
        <header><Header userId={userId}/></header>
      <div className='grid grid-cols-10 '>
      
    <div className='col-span-2'>    <AsideSection  setActive={setActive} active={active}/></div>
    <div className='col-span-8'>    <MainSection  active={active} /></div>
    </div>
      
    </div>
  )
}

export default AfterLogin
