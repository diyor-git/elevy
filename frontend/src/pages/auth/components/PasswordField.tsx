import { useState, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FieldError } from "react-hook-form";

interface Props {
    label: string;
    error?: FieldError;
}

const PasswordField = forwardRef<HTMLInputElement, Props & React.ComponentProps<typeof Input>>(
    ({ label, error, ...inputProps }, ref) => {
        const [show, setShow] = useState(false);

        return (
            <div className="space-y-2">
                <Label>{label}</Label>

                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

                    <Input
                        {...inputProps}
                        ref={ref}
                        type={show ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                    />

                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>

                {error && <p className="text-xs text-destructive">{error.message}</p>}
            </div>
        );
    }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
