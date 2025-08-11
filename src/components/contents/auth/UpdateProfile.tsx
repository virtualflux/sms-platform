'use client'

import { useForm } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

type FormValues = {
  fullName: string
  email: string
  phone: string
  organization?: string
}

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      organization: '',
    },
  })

  const [success, setSuccess] = useState(false)

  const onSubmit = async (data: FormValues) => {
    try {
      console.log('Updating profile with:', data)

      // TODO: Send API request to update profile

      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      console.error('Profile update failed:', err)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-12">
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                {...register('fullName', { required: 'Full name is required' })}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format',
                  },
                })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone', { required: 'Phone number is required' })}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div>
              <Label htmlFor="organization">Organization (optional)</Label>
              <Input id="organization" {...register('organization')} />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Button>

            {success && <p className="text-green-600 text-sm pt-2">Profile updated successfully!</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
