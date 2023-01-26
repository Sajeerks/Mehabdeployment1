import React from 'react'
import {Formik , Form} from 'formik'
import * as Yup from 'yup'
import FormikCodeEvolutionControl from './FormikCodeEvolutionControl'


const FormikCodeEvolutionContainter = () => {
    const intialValuesforForm= {firstName:"",
    comment:"",
    courtPosition:"",
    sex:"",
    relatives:"",
    birthDate:""


}
    const validationSchemasforFOrm = Yup.object().shape({
        firstName:Yup.string().required("requried firstName"),
        comment:Yup.string().required("requried comment"),
        courtPosition:Yup.string().required("requried courtPosition"),
        sex:Yup.string().required("requried SEXXXXXX"),
        relatives:Yup.array().required("required relatvies"),
        birthDate:Yup.date().required('require birthday')
    })
    const onSubmitter =values=>{
        console.log("values in FormikCodeEvolutionContainter ==",values);
    }


const selectOptionseee=[  
    {key:"select an option" ,value:"" } ,
    {key:"king" ,value:"king" } , 
{key:"minister" ,value:"minister" } , 
{key:"vazier" ,value:"vazier" } , 


]
const radioOptionssss =[
    "male",
    "female"
    ,"transMale",
    "transFemale"
]
const checkOptionssss =[
    'son', "daughter", "son in law", "mother in law","father","mother"
]
const validatorssss =(values)=>{
    let errors={}
    if(values.relatives.length ===0){
        errors.relatives = "choosoes at least one relative"
    }

    return errors
}

  return (
    <Formik
    initialValues={intialValuesforForm}
    validationSchema={validationSchemasforFOrm}
    onSubmit={onSubmitter}
    validate={
        validatorssss
    }
    >
     {
        (formik)=>{
             
               return ( <Form>
                   <FormikCodeEvolutionControl control ="input" name="firstName" label="First name" />
                  
                   <FormikCodeEvolutionControl control ="textarea" name="comment" label="Comment ME" />
                  
                   <FormikCodeEvolutionControl selectOptions={selectOptionseee} control ="select" name="courtPosition" label="postions Held" />
                   <FormikCodeEvolutionControl radioOptions={radioOptionssss} control ="radio" name="sex" label="SEXSSS" />
                   
                   
                   <FormikCodeEvolutionControl checkOptions={checkOptionssss} control ="checkbox" name="relatives" label="relatives" />
                   <FormikCodeEvolutionControl control ="date" name="birthDate" label="Birth Dayyy" />
          

                   <button type="submit">Submittter</button>
                </Form>
            )
        }
     }
     </Formik>
  )
}

export default FormikCodeEvolutionContainter