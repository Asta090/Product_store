
// use the model from chakra ui
//change the required model things
//model footer for the buttons

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {  CloseButton, Dialog, Portal } from "@chakra-ui/react"

import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Icon,
	Text,
  Input,
	
	VStack,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import {   useColorModeValue } from "@/components/ui/color-mode"
import { useProductStore } from "../store/product";
import { useState } from "react";
import React from "react";
const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
 const [open, setOpen] = useState(false);


	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteProduct, updateProduct } = useProductStore();



	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
      toaster.error({
        title: "Error",
        description: "product not deleted",
        duration: 3000,

      });
      
		} else {
      toaster.success({
        title: "Update successful",
        description: "Product deleted successfully",
        duration: 3000,

      });
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		setOpen(false);
		
		if (!success) {
      toaster.error({
        title: "Error",
        description: "product not updated",
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
		} else {
      toaster.success({
        title: "Update successful",
        description: "Product updated successfully",
        duration: 3000,
    
      });
		}
	};


	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
			  <Dialog.Root>
      <Dialog.Trigger asChild>
			<IconButton   >
					<Icon size="lg" color="blue" >
					<FaEdit />
           </Icon>
					</IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Update Product</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
            <VStack gap={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  ></Input>
                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  ></Input>
                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  ></Input>
                </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
							<Button
                    onClick={() =>
                      handleUpdateProduct(product._id, updatedProduct)
                    }
                  >
                    Save
                  </Button>
              </Dialog.ActionTrigger>
							<Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
    </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
					




					<IconButton
						onClick={() => handleDeleteProduct(product._id)}>
					<Icon size="lg" color="red">
					<MdDeleteForever />
           </Icon>
						</IconButton>

				</HStack>
			</Box>


			 
		</Box>
	);
};
export default ProductCard;