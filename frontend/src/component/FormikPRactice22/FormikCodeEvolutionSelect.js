import React from 'react'
import { Field, ErrorMessage, } from 'formik'
import TextError from '../TextError'


const FormikCodeEvolutionSelect = (props) => {
    const {name, label , selectOptions,...otherProps} = props
    // console.log("props on FormikCOdEevolutionInput==",props);

  return (
    <div>
   <label  htmlFor={name}>{label}</label>
   

  <Field name={name} id={name} {...otherProps} as="select">
    {
        selectOptions.map((singleOption, index)=>(
            <option key={singleOption.key} value={singleOption.value} >
                {singleOption.key}
            </option>
        ))
    }

  </Field>
    <ErrorMessage name={name} component={TextError}/>
    </div>
  )
}

export default FormikCodeEvolutionSelect