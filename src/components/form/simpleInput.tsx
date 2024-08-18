import { InputHTMLAttributes, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

interface SimpleInputProps {
    name: string,
    form: UseFormReturn<any, any, undefined>,
    className?: string,
    errorClassName?: string,
    inputProps?: InputHTMLAttributes<any>,
}

export const SimpleInput = ({ name, form, className = "", errorClassName = " ", inputProps }: SimpleInputProps) => {

    return (<>
        <input type="text" className={" " + className} {...form.register(name)} {...inputProps} />
        {form.formState.errors[name] && <div className={"error-msg " + errorClassName}>{String(form.formState.errors[name].message)}</div>}
    </>)
}