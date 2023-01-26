import React, { Fragment } from 'react'
import { Field, ErrorMessage, } from 'formik'
import TextError from '../TextError'


const FormilCodeEvolutionCheckBox = (props) => {
    const {name, label , checkOptions,...otherProps} = props
    // console.log("props on FormikCOdEevolutionInput==",props);

  return (
    <div>
   <label  htmlFor={name}>{label}</label>
   

  <Field name={name} id={name} {...otherProps} >
    {
       ({field})=>{
         return checkOptions.map((singleOpt, index) =>{
            return (
                <Fragment key={index}>
                    <label htmlFor={singleOpt}>{singleOpt}</label> 
                     <input type ="checkbox" id={singleOpt} {...field} value={singleOpt}
                     
                      checked={field.value.includes(singleOpt)}
                      
                     
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


export default FormilCodeEvolutionCheckBox