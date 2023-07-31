import React from 'react'
import { Stack, Text } from '@chakra-ui/react'

function ErrorComponent() {
  return (
    <Stack w ={'full'} h={"100vh"} justifyContent={'center'} alignItems={'center'}>
    <Text  px={'4'}> We could not fetch that data. Please retry.</Text>
</Stack>
  )
}

export default ErrorComponent