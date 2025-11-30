import {forwardRef} from "react";

interface FormFieldProps {
    label: string;
    icon: any;
    name: string;
    placeholder?: string;
    error?: any;
    register: any;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    ({label, icon: Icon, name, placeholder, error, register}, ref) => {
        return (
            <div className="space-y-2">
                <label className="text-sm font-medium">{label}</label>
                <div className="relative">
                    {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>}
                    <input
                        {...register(name)}
                        ref={ref} // <-- здесь ref из forwardRef
                        name={name}
                        placeholder={placeholder}
                        className="w-full pl-10 py-2 border rounded-lg"
                    />
                </div>
                {error && <p className="text-xs text-destructive">{error.message}</p>}
            </div>
        );
    }
);

FormField.displayName = "FormField";

export default FormField;