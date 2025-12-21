import VerifyEmail from '@/components/contents/auth/Verification'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyEmail/>
    </Suspense>
  )
}

export default page