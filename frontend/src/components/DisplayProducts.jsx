import React, { useEffect, useState } from 'react'

const DisplayProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch("https://dummyjson.com/products?limit=30")
        .then (res =>res.json())
        .then (data => {
            setProducts(data.products);
            setLoading(false);
        });
    },[]);

  return (
    <>
    <div className=" bg-gray-200">
        <div className="p-20 px-28">
            <h1 className='text-center font-extrabold text-5xl mb-10 '>Product List</h1>

            <div className="">
                <div className="grid grid-cols-4 gap-10">
                    {
                        loading ? ( <p className='text-center font-bold text-3xl mt-24'>Loading Products</p>)
                            : 
                        (
                            products.map((product =>(
                                <div key={product.id} className="w-72 h-96 text-black  rounded-md shadow-2xl p-5">
                                                                   
                                        <img className='w-64 h-52 object-cover rounded-sm mb-4 px-5 '
                                         src={product.thumbnail} 
                                         alt="thumbnail" />
                                         <div className="bg-[#C1D8C3]  rounded-md h-28 px-5 py-2">
                                    <h2 className="text-lg font-medium">{product.title}</h2>
                                   <div className="flex justify-between h-full mt-2">
                                     <h4 className="text-lg text-red-500 font-bold">${product.price}</h4>
                                    <p className="text-md">{product.category}</p>
                                   </div>
                                </div>
                                
                                </div>
                            )))
                        )      
                    }
                </div>
            </div>
        </div>
    </div>
    </>
    //bg-gradient-to-br from-[#5A827E] via-[#84AE92] to-[#B9D4AA] text-white
  )
}

export default DisplayProducts