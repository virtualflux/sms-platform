import Container from '@/components/Container'
import ChangePassword from '@/components/contents/auth/ChangePassword'
import React from 'react'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Dashboard – Change-Password",
    template: "%s | Dashboard – SMS Platform",
  },
};

const page = () => {
  return (
    <Container>
        <ChangePassword/>
    </Container>
  )
}

export default page