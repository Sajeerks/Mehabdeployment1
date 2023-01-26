import React from 'react'
import FormikInput from './FormikInput'
import FormikTextArea from './FormikTextArea'
import FormikSelect from './FormikSelect'
import FormikRadio from './FormikRadio'
import FormikChekBox from './FormikChekBox'
import FormikDatePicker from './FormikDatePicker'

const FormikControl = (props) => {
  const {control , ...rest} = props
  switch (control) {
    case "input":
        return <FormikInput {...rest}/>
    case "textarea":
        return <FormikTextArea {...rest} />
    case "select":
        return <FormikSelect {...rest}/>
    case "radio":
      return <FormikRadio {...rest}/>
    case "checkbox":
      return <FormikChekBox {...rest}/>
    case "date":
      return <FormikDatePicker {...rest} />

        
       
  
    default:
        return null;
  }

  return (
    <div>FormikControl</div>
  )
}

export default FormikControl