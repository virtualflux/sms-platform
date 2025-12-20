'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api/client';
import { Alert } from '@/components/ui/alert';
import aibg from '@images/ai.png'
import Image from 'next/image';

type SignUpFormInputs = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();
  const router = useRouter()

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const response = await apiFetch('/auth/register', 'POST', {
        ...data,
        confirmPassword: undefined
      });
      if (response?.success) {
        Alert({
          title: 'Register Successful',
          icon: 'success',
          text: response?.message,
          darkMode: true
        });
        setTimeout(() => {
          router.push(`/auth/accounts/verification?id=${response?.data}`);
        }, 1200);
      } else {
        Alert({
          title: 'Registration Failed',
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

  const password = watch('password');

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
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  {...register('fullName', { required: 'Name is required' })}
                />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="phone"
                  {...register('phone', { required: 'Phone is required' })}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long',
                    },
                    validate: {
                        hasUppercase: (value) =>
                        /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                        hasLowercase: (value) =>
                        /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                        hasNumber: (value) =>
                        /[0-9]/.test(value) || 'Password must contain at least one number',
                        hasSpecialChar: (value) =>
                        /[@$!%*?&#]/.test(value) ||
                        'Password must contain at least one special character',
                    },
                  })}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
              <div className="text-sm text-center mt-4">
                  <p>Already have an account?{' '}</p>
                  <Link href="/auth/accounts/login" className="text-blue-600 hover:underline">
                      Login?
                  </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
