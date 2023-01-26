import React from 'react'
import './footer.css'
import playstore from '../../images/playstore.png'
import Appstore from '../../images/Appstore.png'



const Footer = () => {
  return (
    <footer id="footer">
   <div className='leftFooter'>
   <h1>Donwload our app</h1>   
   <p> for android and apple store for mobile phone</p> 
   <img src={playstore} alt="playstore" />
   <img src={Appstore} alt="playstore" />




   </div>
    <div className='midFooter'>

        <h1>ECOMMERCE</h1>
        <p>get high qulaity products</p>
        <p> Copyright &copy; SAJEER Munna</p>
    </div>

    <div className='rightFooter'>
    <h1>FOLLOW US</h1>
    <a href="#">instagram</a>
    <a href="#">facebook</a>

    <a href="#">youtube</a>

    </div>

    </footer>
 

  )
}

// document.getElementById('footer')?.addEventListener('mouseover', (e) => {
//   // load the linked content optimistically before click
//   console.log("mouseover", e)
// })

export default Footer