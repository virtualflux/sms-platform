import Container from '@/components/Container'
import SMSHistory from '@/components/contents/SmsHistory'
import React from 'react'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Dashboard – SMS History",
    template: "%s | Dashboard – SMS Platform",
  },
};

const page = () => {
  return (
    <Container>
        <SMSHistory/>
    </Container>
  )
}

export default page