import React from 'react'
import { Formik, Form , Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import TextError from '../TextError'


const intialValues ={
    email:"Enter ur email",
    comment:"enter your comment",
    country:"selct a coutnry",
    sex:"",
    MaritalStatus:[],
    birthDate:null,
    // name:"sample name"
}

const validationSchema =
Yup.object().shape({
   email:Yup.string().required("Required email "),
   comment:Yup.string().required("Required comment "),
   country:Yup.string().required("Required country "),
   sex:Yup.string().required("Required sex "),
   MaritalStatus:Yup.array().required("requiredd MaritalStatus"),
   birthDate:Yup.date().required("required birthdate").nullable()




//    name:Yup.string().required("need name")
})
const onSubmit =(values)=>{
    console.log("values form FormikContainer==", values);
}
const FormikContainer = () => {
   const dropDownOptions=[
    {key:"select an option" , value:""},
    {key:"option 1" , value:"option 1"},
    {key:"option 2" , value:"option 2"},
    {key:"option 3" , value:"option 3"},

   ]
const sexoption =[
    {key:"male" , value:"male"},
    {key:"female" , value:"female"},
    {key:"NA" , value:"NA"},

]

const maritalStatusOptions =[
    {key:"married" , value:"married"},
    {key:"divorced" , value:"divorced"},
    {key:"widowed" , value:"widowed"},
    {key:"unMarried" , value:"unMarried"},


]
 const validate=(values)=>{
    let errors={}
    if(values.MaritalStatus.length === 0){
        errors.MaritalStatus= "the MaritalStatus  is required"
    }
    return errors
  }
  
  return (
    <div>
        <Formik
        initialValues={intialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validate={validate}
        >
            {
                formik=>
        
                {
                    // console.log("formik props in FormikContainer ", formik)
                     return (
                       <Form>
                        <FormikControl control="input" type="email" label="Email" name="email"/>
                        <FormikControl control="textarea" type="text" label="comment" name="comment"/>
                        
                        <FormikControl options={dropDownOptions} control="select" type="text" label="Country" name="country"/>
                       
                        <FormikControl options={sexoption} control="radio" type="text" label="sex selection" name="sex"/>
                        <FormikControl options={maritalStatusOptions} control="checkbox" type="text" label="Marital Status selection" name="MaritalStatus"/>

                        <FormikControl  control="date" label="pick a birth date" name="birthDate"/>

                        {/* <div>
                        <label htmlFor="name" >name</label>
                        <Field
                        id="name"
                        name="name"
                        type="text"
                        >
                    
                        </Field>
                        <ErrorMessage name="name" component={TextError}/>
                        </div> */}
                         <button type='submit'>Submit</button>
                </Form>
                ) 
                }
               
             
            }
        </Formik>
    </div>
  )
}

export default FormikContainer