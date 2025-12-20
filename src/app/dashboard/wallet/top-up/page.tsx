import Container from '@/components/Container'
import WalletTopUp from '@/components/contents/TopUp'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Dashboard – TopUp",
    template: "%s | Dashboard – SMS Platform",
  },
};

const page = () => {
  return (
    <Container>
        <WalletTopUp/>
    </Container>
  )
}

export default page