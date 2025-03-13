import React from 'react';
import { AsideList } from '../../Lists/AsideList';
import "./Aside.css"

const AsideSection = ({ setActive, active }) => {
  return (
    <aside>
        
      <div className='asideSection w-[39%] md:w-[37vh]'>
        <ul className="asidelist">
          <li>Main Navigation</li>
          {AsideList.map((e) => {
            return (
              
              <li 
                key={e.id}
                onClick={() => { setActive(e.id); }}
                className={active === e.id ? "active" : "asideLi"}
                // const icon =e={.icon}
              >
                <div className="flex">
                <span>{e.incons}</span>
                <span style={{paddingLeft:'5px'}}>{e.title}</span>
                </div>
                
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default AsideSection;