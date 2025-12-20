import Container from '@/components/Container'
import SendSMSForm from '@/components/contents/SendSms'
import React from 'react'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Dashboard – Send-SMS",
    template: "%s | Dashboard – SMS Platform",
  },
};

const page = () => {
  return (
    <Container>
        <SendSMSForm/>
    </Container>
  )
}

export default page