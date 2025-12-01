import {Link, useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, LoginSchema} from "@/pages/auth/schema/login-schema";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {GraduationCap, Mail} from "lucide-react";
import {PasswordField} from "@/pages/auth/components";
import {useGetProfileQuery, useSignInMutation} from "@/api/auth-api.ts";
import {SignInDataTypes} from "@/types/auth-types.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {useEffect} from "react";

function SigninPage() {
    const navigate = useNavigate();
    const [signIn, {isLoading, error}] = useSignInMutation();
    const {toast} = useToast()

    const {data: user, isLoading: userLoading, isError} = useGetProfileQuery();

    const {control, handleSubmit, formState: {errors}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: "", password: ""}
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            await signIn(data as SignInDataTypes).unwrap();
            navigate("/dashboard/startups");
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
                    <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground text-center mb-6">
                        Sign in to access your Elevy dashboard
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                        {/* Password */}
                        <Controller
                            name="password"
                            control={control}
                            render={({field}) => <PasswordField {...field} error={errors.password} label="Password"/>}
                        />

                        <Button type="submit" disabled={isLoading} className="w-full h-11 font-semibold">
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SigninPage;
