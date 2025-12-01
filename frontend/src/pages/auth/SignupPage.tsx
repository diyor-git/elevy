import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signupSchema, SignupSchema} from "@/pages/auth/schema/signup-schema.ts";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {GraduationCap, Mail, User} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {PasswordField} from "@/pages/auth/components";
import {useGetProfileQuery, useSignUpMutation} from "@/api/auth-api.ts";
import {SignUpDataTypes} from "@/types/auth-types.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {useEffect} from "react";

export default function SignupPage() {
    const navigate = useNavigate();
    const [signUp, {isLoading, error: serverError}] = useSignUpMutation();
    const {toast} = useToast()

    const {data: user, isLoading: userLoading, isError} = useGetProfileQuery();

    const {control, handleSubmit, formState: {errors}} = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            gender: "male",
            birthDate: "2000-01-01"
        }
    });

    const onSubmit = async (data: SignupSchema) => {
        try {
            await signUp(data as SignUpDataTypes).unwrap();
            navigate("/dashboard/startups")
        } catch (err: any) {
            toast({
                title: "Ошибка",
                description: err?.data?.message || "Sign in failed",
                variant: "destructive"
            })
        }
    };


    useEffect(() => {
        if (user) {
            navigate("/dashboard/startups")
        }
    }, [])


    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-primary/5">
            <div className="w-full max-w-md">
                <Link to="/" className="flex items-center justify-center gap-2 text-2xl font-bold mb-12">
                    <GraduationCap className="h-8 w-8 text-primary"/>
                    <span>Elevy</span>
                </Link>

                <div className="bg-card border p-8 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
                    <p className="text-muted-foreground text-center mb-6">
                        Join thousands discovering opportunities on Elevy
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* First Name */}
                        <Controller
                            name="first_name"
                            control={control}
                            render={({field}) => (
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                        <Input {...field} placeholder="John" className="pl-10"/>
                                    </div>
                                    {errors.first_name &&
                                        <p className="text-xs text-destructive">{errors.first_name.message}</p>}
                                </div>
                            )}
                        />

                        {/* Last Name */}
                        <Controller
                            name="last_name"
                            control={control}
                            render={({field}) => (
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                        <Input {...field} placeholder="Doe" className="pl-10"/>
                                    </div>
                                    {errors.last_name &&
                                        <p className="text-xs text-destructive">{errors.last_name.message}</p>}
                                </div>
                            )}
                        />

                        {/* Email */}
                        <Controller
                            name="email"
                            control={control}
                            render={({field}) => (
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <div className="relative">
                                        <Mail
                                            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                                        <Input {...field} placeholder="you@example.com" className="pl-10"/>
                                    </div>
                                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                                </div>
                            )}
                        />

                        {/* Gender */}
                        <Controller
                            name="gender"
                            control={control}
                            render={({field}) => (
                                <div className="space-y-2">
                                    <Label>Gender</Label>
                                    <select {...field} className="w-full px-3 py-2 border rounded-lg bg-background">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender &&
                                        <p className="text-xs text-destructive">{errors.gender.message}</p>}
                                </div>
                            )}
                        />

                        <Controller
                            name="birthDate"
                            control={control}
                            render={({field}) => (
                                <div className="space-y-2">
                                    <Label>Birth Date</Label>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type="date"
                                            className="w-full px-3 py-2 border rounded-lg bg-background"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)} // сохраняем ISO 8601
                                            max={new Date().toISOString().split("T")[0]} // нельзя выбрать будущую дату
                                        />
                                    </div>
                                    {errors.birthDate && (
                                        <p className="text-xs text-destructive">{errors.birthDate.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="password"
                            control={control}
                            render={({field}) => (
                                <PasswordField {...field} error={errors.password} label="Password"/>
                            )}
                        />

                        {serverError && <p className="text-xs text-destructive text-center">{"serverError"}</p>}

                        <Button disabled={isLoading} type="submit" className="w-full h-11 mt-4 font-semibold">
                            {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Have an account?{" "}
                        <Link to="/signin" className="text-primary font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
