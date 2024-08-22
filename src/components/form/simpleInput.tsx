import { InputHTMLAttributes, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

interface SimpleInputProps {
    name: string,
    title?: string,
    isRequired?: boolean,
    form: UseFormReturn<any, any, undefined>,
    className?: string,
    errorClassName?: string,
    inputProps?: InputHTMLAttributes<any>,
}

export const SimpleInput = ({ title, name, form, className = "", errorClassName = " ", inputProps, isRequired = false }: SimpleInputProps) => {

    return (<div>
        {title && <div style={{ display: "flex", justifyContent: "start", width: "100%" }}>
            <div>{title}</div>
            {isRequired && " *"}
        </div>}
        <input type="text" className={" " + className} {...form.register(name)} {...inputProps} />
        {form.formState.errors[name] && <div className={"error-msg " + errorClassName}>{String(form.formState.errors[name].message)}</div>}
    </div>)
}