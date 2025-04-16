import {Button,  Container, Flex, HStack, Text} from '@chakra-ui/react';
import { FaPlusSquare } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeButton } from "@/components/ui/color-mode"

const Navbar = () => {

  return (
  <Container maxW={"1140px"} px={4}>
<Flex 
h={16}

alignItems={"center"} 
justifyContent={"space-between"} 
flexDir={{base: "column", sm: "row"}}
>
  <Text
  fontSize={{ base: "22", sm: "28" }}
  fontWeight={"bold"}
  textTransform={"uppercase"}
  textAlign={"center"}
  bgGradient="linear-gradient({colors.cyan.400}, {colors.blue.500})"
  bgClip={"text"}
>
  <Link to={"/"}>Product Store 🛒</Link>
  </Text>


  <HStack spacing={2} alignItems={"center"}>
    <Link to={"/create"}>
    <Button background={"cyan.500"} color={"black"} _hover={{bg: "teal.500"}}>
    <FaPlusSquare fontSize={20}  />
    </Button>
    </Link>
  
    <ColorModeButton />
   
  </HStack>

</Flex>

  </Container>
  );
};

export default Navbar