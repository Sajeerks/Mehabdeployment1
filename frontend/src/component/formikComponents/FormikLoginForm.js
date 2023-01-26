import React from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

const FormikLoginForm = () => {
    const intialValue= {
        email:"", 
        password:"",
    }
   const vaidationSchema = Yup.object({
        email:Yup.string().email("invalid email").required("rquired"),
        password:Yup.string().required("requiired password")

    })
    const onSubmit = (values)=>{
        console.log("values forom  FormikLoginForm", values);
    }
  return (
     <Formik
     initialValues={intialValue}
     validationSchema={vaidationSchema}
     onSubmit={onSubmit}
     >
        {formik=>{
            console.log("formik---",formik);
         return (
            <Form>
                <FormikControl
                 control="input"
                 type="email"
                 label="EMAIL"
                 name="email"
                />
                 <FormikControl
                 control="input"
                 type="password"
                 label="password"
                 name="password"
                />
            <button type='submit'>Submit</button>
            </Form>
            )
            
         }
        }

     </Formik>
  )
}

export default FormikLoginForm