'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiFetch } from '@/lib/api/client';
import { Alert } from '@/components/ui/alert';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import aibg from '@images/ai.png'
import Image from 'next/image';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await apiFetch('/auth/login', 'POST', data);
      if (response?.success) {
        Alert({
          title: 'Login Successful',
          icon: 'success',
          text: 'Welcome back!',
          darkMode: true
        });
        dispatch(
          setCredentials({
            user: response?.data?.user,
            accessToken: response?.data?.tokens?.accessToken,
            refreshToken: response?.data?.tokens?.refreshToken,
          })
        )
        setTimeout(() => {
          router.push('/dashboard');
        }, 1200);
      } else {
        Alert({
          title: 'Login Failed',
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted">
      {/* Left hero section */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-indigo-600 
      to-purple-700 text-white items-center justify-center p-10">
        <div className="max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-bold">Welcome to VfluxSMS</h1>
          <p className="text-lg text-gray-100">
            Send SMS globally, track delivery, and manage your campaigns all in one platform.
          </p>
          <Image width={200} height={200} src={aibg} alt="SMS illustration" className="mx-auto w-64 rounded-xl"/>
        </div>
      </div>

      {/* Right form section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">Login to VfluxSMS</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              <div className="flex justify-between items-center text-sm">
                <Link href="/auth/recovery/forgot-password" className="text-red-500 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full py-3" disabled={isSubmitting || loading}>
                {isSubmitting || loading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4">
                Don’t have an account?{' '}
                <Link href="/auth/accounts/signup" className="text-blue-500 hover:underline">
                  Create one
                </Link>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
