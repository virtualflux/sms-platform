import Container from '@/components/Container'
import ScheduledSms from '@/components/contents/ScheduledSms'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Dashboard – Scheduled SMS",
    template: "%s | Dashboard – SMS Platform",
  },
};

const page = () => {
  return (
    <Container>
        <ScheduledSms/>
    </Container>
  )
}

export default page