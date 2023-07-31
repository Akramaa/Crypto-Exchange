import { Avatar, Box, Stack, VStack , Text} from '@chakra-ui/react'
import React from 'react'

function Footer() {
  return (
   
    <Box w={'full'} minH={'48'} bgColor={'blackAlpha.800'} px={'16'} py={['16', '8']} color={'whiteAlpha.700'}>
     <Stack direction={['column', 'row']} h={'full'} alignItems={'center'}>
       <VStack w={'full'} alignItems={['center', 'flex-start']}>
        <Text fontWeight={'bold'}>About Us</Text>
        <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center', 'left']}> We are the best crypto trading app in India, we provide our guidance at very cheap price</Text>

       </VStack>
       <VStack>
        <Avatar boxSize={'28'} mt={['4', '0']}/>
        <Text>
            Our Founder
        </Text>
       </VStack>
     </Stack>
    </Box>
  )
}

export default Footer