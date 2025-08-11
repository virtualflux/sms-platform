'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ForgotPasswordFormInputs = {
  email: string;
};

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormInputs>();
  const router = useRouter()

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    try {
      console.log('Sending reset link to:', data.email);
      router.push('/auth/recovery/reset-password')
      // Send email to backend to trigger reset password process
    } catch (error) {
      console.error('Error sending reset link:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
            <div className="text-sm text-center mt-4">
                <p>Remember password?{' '}</p>
                <Link href="/auth/accounts/login" className="text-blue-600 hover:underline">
                    Login?
                </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
