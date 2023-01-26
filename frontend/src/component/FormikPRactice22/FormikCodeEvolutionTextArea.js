import React from 'react'
import { Field, ErrorMessage, } from 'formik'
import TextError from '../TextError'

const FormikCodeEvolutionTextArea = (props) => {
    const {name, label ,...otherProps} = props
    // console.log("props on FormikCOdEevolutionInput==",props);

  return (
    <div>
   <label  htmlFor={name}>{label}</label>

  <Field name={name} id={name} {...otherProps} as="textarea">

  </Field>
    <ErrorMessage name={name} component={TextError}/>
    </div>
  )
}

export default FormikCodeEvolutionTextArea