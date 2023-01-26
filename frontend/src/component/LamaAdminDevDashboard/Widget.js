import React from 'react'
import './Widget.css'
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

const Widget = ({type}) => {
  return (
    <div className='widgetlama'>
         <div className="leftwidger">
            <div className="titlerlama">title</div>
            <div className="coutnerlama">2135</div>
            <div className="linkerlaa">see all users heere</div> 
         </div>

         <div className="rightwidget">
             <div className="percntagelaa">
            <InvertColorsIcon/>
            20%
             </div>
              <div className="peosnerico">
              <RecordVoiceOverIcon/>
              </div>
         </div>
    </div>
  )
}

export default Widget