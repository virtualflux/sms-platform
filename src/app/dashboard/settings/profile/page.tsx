import Container from '@/components/Container'
import UpdateProfile from '@/components/contents/auth/UpdateProfile'
import React from 'react'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Dashboard – Profile",
    template: "%s | Dashboard – SMS Platform",
  },
};

const page = () => {
  return (
    <Container>
        <UpdateProfile/>
    </Container>
  )
}

export default page