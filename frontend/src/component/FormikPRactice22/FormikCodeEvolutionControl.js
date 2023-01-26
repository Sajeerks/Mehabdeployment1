import React from 'react'
import FormikCOdEevolutionInput from './FormikCOdEevolutionInput'
import FormikCodeEvolutionTextArea from './FormikCodeEvolutionTextArea'
import FormikCodeEvolutionSelect from './FormikCodeEvolutionSelect'
import FormikCodeEvolutionRadio from './FormikCodeEvolutionRadio'
import FormilCodeEvolutionCheckBox from './FormilCodeEvolutionCheckBox'
import FormikCodeEvolutionDatepicker from './FormikCodeEvolutionDatepicker'

const FormikCodeEvolutionControl = (props) => {
    // console.log("props on FormikCodeEvolutionControl==",props);
    const {control, ...otherprops} = props
    switch (control) {
        case "input":
            return <FormikCOdEevolutionInput {...otherprops} />

        case "textarea":
            return <FormikCodeEvolutionTextArea {...otherprops} />
        case "select":
            return <FormikCodeEvolutionSelect {...otherprops} />
        case "radio":
            return <FormikCodeEvolutionRadio {...otherprops} />
        case "checkbox":
            return <FormilCodeEvolutionCheckBox {...otherprops} />
        case "date":
            return <FormikCodeEvolutionDatepicker {...otherprops} />
        default :return null
            
        
    }
}

export default FormikCodeEvolutionControl