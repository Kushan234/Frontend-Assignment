import React, { useEffect, useState } from 'react'

const DisplayProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");


    useEffect(()=>{
        fetch("https://dummyjson.com/products?limit=30")
        .then (res =>res.json())
        .then (data => {
            setProducts(data.products);
            setFilteredProducts(data.products);

            const cat = [...new Set(data.products.map((prod)=>prod.category))];
            setCategories(cat);
            setLoading(false);
        });
    },[]);

    const handleFilter =(category)=>{
        setSelectCategory(category);

        if(category === ""){
            setFilteredProducts(products);

        }else{
            const filterItems = products.filter((items)=>
                items.category === category);
            setFilteredProducts(filterItems);
        }
    }

  return (
    <>
    <div className=" bg-gray-200">
        <div className="p-20 px-28">
            <h1 className='text-center font-extrabold text-5xl mb-10 '>Product List</h1>

            <div className="items-center text-center ">
                
                <select className='w-44 h-10 text-lg border-1 rounded-sm mb-10 px-3 cursor-pointer' 
                 name="filter" id="filter"
                 value={selectCategory}
                 onChange={(e)=>handleFilter(e.target.value)}
                 >
                    <option value="">All Category</option>
                     <option value="beauty">beauty</option>
                     <option value="groceries">groceries</option>
                    <option value="fragrances">fragrances</option>
                    <option value="furniture">furniture</option>
                     
                </select>
            </div>

            <div className="">
                <div className="grid grid-cols-4 gap-10 cursor-pointer">
                    {
                        loading ? ( <p className='text-center font-bold text-3xl mt-24'>Loading Products...</p>)
                            : 
                        (
                            filteredProducts.map((product =>(
                                <div key={product.id} className="w-72 h-96 text-black  rounded-md shadow-2xl p-5">
                                                                   
                                        <img className='w-64 h-52 object-cover rounded-sm mb-4 px-5 '
                                         src={product.thumbnail} 
                                         alt="thumbnail" />
                                         <div className="bg-[#C1D8C3]  rounded-md h-28 px-5 py-2">
                                    <h2 className="text-lg font-medium">{product.title}</h2>
                                   <div className="flex justify-between h-full mt-2">
                                     <h4 className="text-lg text-green-600 font-bold">${product.price}</h4>
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
  
  )
}

export default DisplayProducts

  //bg-gradient-to-br from-[#5A827E] via-[#84AE92] to-[#B9D4AA] text-white