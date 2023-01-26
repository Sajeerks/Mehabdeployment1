import React from 'react'
import { useParams } from 'react-router-dom'

const LamaSingleUser = ({title}) => {
    let {userId } = useParams()
    

  return (
    <div>LamaSingleUser ++ {userId}+</div>
  )

  
}
LamaSingleUser.defultProps = {
  title:"mUnnara"
}
export default LamaSingleUser
