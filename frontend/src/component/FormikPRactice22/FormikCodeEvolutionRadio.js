import React, { Fragment } from 'react'
import { Field, ErrorMessage, } from 'formik'
import TextError from '../TextError'


const FormikCodeEvolutionRadio = (props) => {
    const {name, label , radioOptions,...otherProps} = props
    // console.log("props on FormikCOdEevolutionInput==",props);

  return (
    <div>
   <label  htmlFor={name}>{label}</label>
   

  <Field name={name} id={name} {...otherProps} >
    {
       ({field})=>{
         return radioOptions.map((singleOpt, index) =>{
            return (
                <Fragment key={index}>
                    <label htmlFor={singleOpt}>{singleOpt}</label> 
                     <input type ="radio" id={singleOpt} {...field} value={singleOpt}
                     
                      checked={field.value === singleOpt}

                     
                     />
                     
                </Fragment>
            )
         })

       }
    }

  </Field>
    <ErrorMessage name={name} component={TextError}/>
    </div>
  )
}

export default FormikCodeEvolutionRadio