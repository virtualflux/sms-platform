import Container from '@/components/Container'
import Api from '@/components/contents/API'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Dashboard – API",
    template: "%s | Dashboard – SMS Platform",
  },
};

const page = () => {
  return (
    <Container>
        <Api/>
    </Container>
  )
}

export default page