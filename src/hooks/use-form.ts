import { useState } from "react"

interface EventHandleChangeForm {
    name: string, 
    value?: string
}

type ErrorValidate<I> = {
    [Key in keyof I]: string;
};

interface useFormProps<I> {
    initialValues: object & I
    onSubmit: (values: I) => void
    onValidation: (values: I) => ErrorValidate<I>
}

export default <I>({ initialValues, onSubmit, onValidation }: useFormProps<I>) => {
    const [ values, setValues ] = useState<I>(initialValues);
    const [ errors, setErrors ] = useState<ErrorValidate<I>>(); 

    const handleChange = ({ name, value }: EventHandleChangeForm) => {
        setValues(state => ({
            ...state,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        const err = onValidation(values);
        let isValidValues = true;
        
        if(err === undefined) return;

        Object.keys(err).forEach(key => {
            //@ts-ignore
            if(err[key] !== ""){
                isValidValues = false;
            }
        });        

        if(isValidValues){
            onSubmit(values);
            setErrors(err);
            return;
        }

        setErrors(err);
        return;
    }

    return { values, errors, handleChange, handleSubmit, setValues }
}