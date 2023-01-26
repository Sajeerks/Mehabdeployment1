import React from 'react'
import { Field, ErrorMessage, } from 'formik'
import TextError from '../TextError'

const FormikCOdEevolutionInput = (props) => {
    const {name, label ,...otherProps} = props
    // console.log("props on FormikCOdEevolutionInput==",props);

  return (
    <div>
   <label  htmlFor={name}>{label}</label>

  <Field name={name} id={name} {...otherProps}>

  </Field>
    <ErrorMessage name={name} component={TextError}/>
    </div>
  )
}

export default FormikCOdEevolutionInput