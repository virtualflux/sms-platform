'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

type VerificationFormInputs = {
  code: string;
};

export default function VerifyEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerificationFormInputs>();

  const onSubmit: SubmitHandler<VerificationFormInputs> = async (data) => {
    try {
      console.log('Verifying email with code:', data.code);
      // Submit verification code to backend here
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                {...register('code', { required: 'Verification code is required' })}
              />
              {errors.code && <p className="text-sm text-red-500">{errors.code.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
