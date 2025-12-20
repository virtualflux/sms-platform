import Container from '@/components/Container'
import LowBalanceReminder from '@/components/contents/BalanceReminder'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Dashboard – Low Balance-Reminder",
    template: "%s | Dashboard – SMS Platform",
  },
};

const page = () => {
  return (
    <Container>
        <LowBalanceReminder/>
    </Container>
  )
}

export default page