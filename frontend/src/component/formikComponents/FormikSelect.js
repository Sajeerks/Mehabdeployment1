import React from 'react'
import { ErrorMessage, Field } from 'formik'
import TextError from '../TextError'



const FormikSelect = (props) => {
    const {label, name ,options, ...rest} = props

  return (
    <div className='formController'>
    <label htmlFor={name} >{label}</label>
    <Field id={name} name={name} {...rest} as="select">
        {
            options.map(option=>{
                return(
                 <option key={option.value} value={option.value}>{option.key}</option>
                )
              
            })
        }
  

    </Field>
  <ErrorMessage name={name} component={TextError}/>
   

</div>
  )
}

export default FormikSelect