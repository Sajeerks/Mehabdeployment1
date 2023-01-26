import React from 'react'
import { ErrorMessage, Field } from 'formik'
import TextError from '../TextError'


const FormikTextArea = (props) => {
    const {label, name , ...rest} = props

  return (
    <div className='formController'>
    <label htmlFor={name} >{label}</label>
    <Field id={name} name={name} {...rest} as="textarea"></Field>
  <ErrorMessage name={name} component={TextError}/>
   

</div>
  )
}

export default FormikTextArea