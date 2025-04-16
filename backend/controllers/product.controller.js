import product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts=async (req,res)=>{
  try{
    const products=await product.find();
    res.status(200).json({success:true,data:products});
  }
  catch(error){
    console.error("Error fetching products:", error.message);
    res.status(500).json({success:false,message:"server error"});
  }
  
}


export const createProduct=async (req,res)=>{
  const Product=req.body;
  if(!Product.name || !Product.price || !Product.image){
    return res.status(400).json({success:false,message:"please fill all fields"});
  }

  const newProduct= new product(Product);
  try{
    await newProduct.save();
    res.status(201).json({success:true,data:newProduct});
  }
  catch(error){
    console.error("Error creating product:", error.message);
    res.status(500).json({success:false,message:"server error"});
  }
}
export const deleteProduct= async (req,res)=>{
  const {id}=req.params;
  if(mongoose.Types.ObjectId.isValid(id)===false){
    return res.status(400).json({success:false,message:"invalid product id"});
   }
  try {
   await product.findByIdAndDelete(id);
   res.status(200).json({success:true,message:"product deleted successfully"});
  }
  catch (error) {
   res.status(500).json({success:false,message:"server error"});
  }
 }
 export const updateProduct=async (req,res)=>{
  const {id}=req.params;
  const Product=req.body;
  if(mongoose.Types.ObjectId.isValid(id)===false){
   return res.status(400).json({success:false,message:"invalid product id"});
  }
  try{
   const updatedProduct=await product.findByIdAndUpdate(id,Product,{new:true});
   res.status(200).json({success:true,data:updatedProduct});

  }catch(error){
   console.error("Error updating product:", error.message);
   res.status(500).json({success:false,message:"server error"});
  }

}