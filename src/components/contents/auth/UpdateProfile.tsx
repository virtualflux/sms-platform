'use client'

import { useForm } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api/client'
import { Alert } from '@/components/ui/alert'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCredentials } from '@/store/slices/authSlice'

type FormValues = {
  name: string
  email: string
  phone: string
  // organization?: string
}

export default function UpdateProfile() {
  const {user} = useAppSelector((state)=>state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await apiFetch(
          '/auth/profile',
          'PUT',
          data
      )
      if(response?.success){
          Alert({
            title: 'Success',
            icon: 'success',
            text: response?.message,
            darkMode: true
          });
          dispatch(
            setCredentials({
              user: response?.data?.user,
              accessToken: response?.data?.tokens?.accessToken,
              refreshToken: response?.data?.tokens?.refreshToken,
            })
          )
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
    <div className="max-w-xl mx-auto mt-12">
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register('name')}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  // required: 'Email is required',
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
                {...register('phone')}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            {/* <div>
              <Label htmlFor="organization">Organization (optional)</Label>
              <Input id="organization" {...register('organization')} />
            </div> */}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
