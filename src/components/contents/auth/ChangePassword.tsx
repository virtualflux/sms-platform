'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { apiFetch } from '@/lib/api/client'
import { Alert } from '@/components/ui/alert'

type FormValues = {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset
    } = useForm<FormValues>()
    const [pending, setPending] = useState(false)


    const onSubmit = async (data: FormValues)  => {
        try {
            const response = await apiFetch(
                '/auth/change-password',
                'POST',
                {...data, confirmPassword: undefined}
            )
            if(response?.success){
                Alert({
                    title: 'Success',
                    icon: 'success',
                    text: response?.message,
                    darkMode: true
                });
                reset()
            }else{
                Alert({
                    title: 'Error',
                    icon: 'error',
                    text: response?.message,
                    darkMode: true
                });
            }
        } catch (error) {
            console.log(error)
            Alert({
                title: 'Error',
                icon: 'error',
                text: 'Something went wrong',
                darkMode: true
            });
        }
    }

  return (
    <div className="max-w-md mx-auto mt-12">
        <Card>
            <CardHeader>
            <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                <Label htmlFor="oldPassword">Current Password</Label>
                <Input
                    type="password"
                    id="oldPassword"
                    {...register('oldPassword', { required: 'Current password is required' })}
                />
                {errors.oldPassword && (
                    <p className="text-sm text-red-500">{errors.oldPassword.message}</p>
                )}
                </div>

                <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                        type="password"
                        id="newPassword"
                        {...register('newPassword', {
                        required: 'New password is required',
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

                    {errors.newPassword && (
                        <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                    )}
                </div>

                <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                        value === watch('newPassword') || 'Passwords do not match',
                    })}
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Saving...' : 'Change Password'}
                </Button>
            </form>
            </CardContent>
        </Card>
    </div>
  )
}
