import Container from '@/components/Container'
import LowBalanceReminder from '@/components/contents/BalanceReminder'
import React from 'react'

const page = () => {
  return (
    <Container>
        <LowBalanceReminder/>
    </Container>
  )
}

export default page