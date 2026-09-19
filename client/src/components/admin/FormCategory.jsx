// rafce
import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const FormCategory = () => {
    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    const categories = useEcomStore((state)=>state.categories)
    const getCategory = useEcomStore((state)=>state.getCategory)

    useEffect(() => {
        getCategory(token)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name) {
            return toast.warning('Please fill data')
        }
        try {
            const res = await createCategory(token, { name })
            toast.success(`Add Category ${res.data.name} success!!!`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemove = async(id)=>{
        try{
            const res = await removeCategory(token,id)
            toast.success(`Deleted ${res.data.name} success`)
            getCategory(token)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
            <div>
                <h2 className="text-2xl font-black text-gray-800">Category Management</h2>
                <p className="text-sm text-gray-500 mt-1">Add or remove product categories for your store.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex max-w-2xl gap-3">
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white text-gray-800 font-medium" 
                    placeholder="New Category Name..." 
                />
                <button className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-8 py-3 font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2">
                    Add Category
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categories.map((item) => (
                    <div key={item.id} className="group relative flex items-center justify-between border-2 border-transparent bg-gray-50 hover:bg-white rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all">
                        <span className="font-semibold text-gray-700">{item.name}</span>
                        <button 
                            onClick={() => handleRemove(item.id)} 
                            className="text-red-500 bg-red-50/50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white font-bold text-xs uppercase tracking-wider"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FormCategory