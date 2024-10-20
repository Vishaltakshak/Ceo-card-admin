import {useState} from 'react'
import ContentSubHeader from '../../Components/ContentManagement/ContentSubHeader'
import ContentTiles from '../../Components/ContentManagement/ContentTIles'
import AddNewContentForm from '../../Components/ContentManagement/AddNewContent'

const ContentManagement = () => {
  const [page, showForm]= useState(0)
  const toggleNewForm = () => {
    showForm(page === 1 ? 0 : 1);
  };
  return (
    <div>
      <ContentSubHeader toggleNewForm={toggleNewForm}/>
      {page===0?(<ContentTiles/>):(<AddNewContentForm active={page} setActive={showForm}/>)}
      
      
    </div>
  )
}

export default ContentManagement
