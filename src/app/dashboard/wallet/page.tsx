import Container from '@/components/Container'
import WalletHistory from '@/components/contents/WalletHistory'
import React from 'react'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Dashboard – Wallet History",
    template: "%s | Dashboard – SMS Platform",
  },
};
const page = () => {
  return (
    <Container>
        <WalletHistory/>
    </Container>
  )
}

export default page