'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

type FormValues = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>()

    const [success, setSuccess] = useState(false)

    const onSubmit = async (data: FormValues) => {
        if (data.newPassword !== data.confirmPassword) return

        try {
            // TODO: send request to backend to change password
            console.log('Changing password...', data)

            setSuccess(true)
        } catch (err) {
            console.error(err)
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
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                    type="password"
                    id="currentPassword"
                    {...register('currentPassword', { required: 'Current password is required' })}
                />
                {errors.currentPassword && (
                    <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
                )}
                </div>

                <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                    type="password"
                    id="newPassword"
                    {...register('newPassword', {
                    required: 'New password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
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

                {success && (
                <p className="text-sm text-green-600 pt-2">Password changed successfully!</p>
                )}
            </form>
            </CardContent>
        </Card>
    </div>
  )
}
