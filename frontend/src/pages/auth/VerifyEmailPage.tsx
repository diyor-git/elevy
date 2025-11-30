import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import {AlertCircle, ArrowLeft, CheckCircle2, GraduationCap, Mail} from 'lucide-react';
import {Link, useSearchParams} from 'react-router-dom';

function VerifyEmailPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get('email') || '';

    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [canResend, setCanResend] = useState(false);

    // Timer for resend button
    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!code) {
            setError('Please enter the verification code');
            return;
        }

        if (code.length !== 6) {
            setError('Code must be 6 digits');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // In a real app, you'd verify the code with your backend
            setSuccess(true);
            setIsLoading(false);

            // Redirect to login after success
            setTimeout(() => {
                // router.push('/auth/login');
            }, 2000);
        }, 1500);
    };

    const handleResendCode = async () => {
        setIsLoading(true);
        setError('');

        // Simulate API call to resend code
        setTimeout(() => {
            setIsLoading(false);
            setTimeLeft(300);
            setCanResend(false);
            setCode('');
        }, 1000);
    };

    if (success) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md text-center">
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-primary/10 rounded-full p-4">
                                <CheckCircle2 className="h-12 w-12 text-primary"/>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Email Verified!</h1>
                            <p className="text-muted-foreground">
                                Your email has been verified successfully. Redirecting to login...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <Link
                    to="/auth/signup"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
                >
                    <ArrowLeft className="h-4 w-4"/>
                    Back to Sign Up
                </Link>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-2xl mb-8 justify-center">
                    <GraduationCap className="h-8 w-8 text-primary"/>
                    <span>Elevy</span>
                </Link>

                {/* Card */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-center">Verify Your Email</h1>
                    <p className="text-muted-foreground text-center mb-8">
                        We sent a verification code to {email || 'your email'}. Enter it below to continue.
                    </p>

                    <form onSubmit={handleVerify} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3">
                                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0"/>
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        {/* Verification Code Field */}
                        <div className="space-y-2">
                            <Label htmlFor="code" className="text-sm font-medium">
                                Verification Code
                            </Label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"/>
                                <Input
                                    id="code"
                                    type="text"
                                    placeholder="000000"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                    className="pl-10 text-center text-2xl tracking-widest font-mono"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Enter the 6-digit code from your email
                            </p>
                        </div>

                        {/* Verify Button */}
                        <Button
                            type="submit"
                            className="w-full h-11 text-base font-semibold"
                            disabled={isLoading || code.length !== 6}
                        >
                            {isLoading ? 'Verifying...' : 'Verify Email'}
                        </Button>
                    </form>

                    {/* Resend Code Section */}
                    <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground text-center mb-4">
                            Didn't receive a code?
                        </p>
                        {canResend ? (
                            <Button
                                onClick={handleResendCode}
                                variant="outline"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Resend Code'}
                            </Button>
                        ) : (
                            <Button
                                disabled
                                variant="outline"
                                className="w-full"
                            >
                                Resend code in {formatTime(timeLeft)}
                            </Button>
                        )}
                    </div>

                    {/* Change Email Link */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Wrong email?{' '}
                        <Link to="/auth/signup" className="text-primary font-semibold hover:underline">
                            Go back
                        </Link>
                    </p>
                </div>

                {/* Footer Text */}
                <p className="text-center text-xs text-muted-foreground mt-8">
                    For security, we verify all email addresses. Check your spam folder if you don't see the code.
                </p>
            </div>
        </div>
    );
}

export default VerifyEmailPage;