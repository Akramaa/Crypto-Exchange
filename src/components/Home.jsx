import React from 'react'
import { Box, Image, Text} from '@chakra-ui/react'
import btc from '../assets/btc (2).png'
import Footer from './Footer'
import { motion } from 'framer-motion'

function Home() {
  return (
   <Box w={'full'} h={'85vh'}  mt={'5rem'} >
    <motion.div style={{
      height : '80vh',
    }}
    animate={{
      translateY: '20px',
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse'
    }}>
    <Image w={'full'} h={'full'} objectFit={'contain'} src ={btc} ></Image>
    </motion.div>
    <Text fontSize={'6xl'}
    textAlign={'center'}
    fontWeight={'thin'}
    color={'goldenrod'}>
      Trade X
    </Text>
    <Footer/>
   </Box>
  )
}

export default Home