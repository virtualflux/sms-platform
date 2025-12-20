'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api/client';
import { Alert } from '@/components/ui/alert';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type VerificationFormInputs = {
  code: string;
};

export default function VerifyEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerificationFormInputs>();
  const router = useRouter()
  const search = useSearchParams()
  const id = search.get('id')

  useEffect(() => {
    if(!id) router.replace('/auth/accounts/login')
  }, [id])
  

  const onSubmit: SubmitHandler<VerificationFormInputs> = async (data) => {
    try {
      const response = await apiFetch('/auth/verification', 'POST', {
        ...data,
        userId: id
      });
      if (response?.success) {
        Alert({
          title: 'Verification complete',
          icon: 'success',
          text: response?.message,
          darkMode: true
        });
        setTimeout(() => {
          router.push(`/auth/accounts/login`);
        }, 1200);
      } else {
        Alert({
          title: 'Verification Failed',
          icon: 'error',
          text: response?.message || 'Invalid credentials',
          darkMode: true
        });
      }
    } catch (error) {
      console.error(error);
      Alert({
        title: 'Error',
        icon: 'error',
        text: 'Something went wrong',
        darkMode: true
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Verify Your Email</CardTitle>
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
