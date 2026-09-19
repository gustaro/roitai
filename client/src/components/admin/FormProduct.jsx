// rafce
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};
const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory(token);
    getProduct(100);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm(initialState);
      getProduct(100);
      toast.success(`เพิ่มข้อมูลสำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("จะลบจริงๆ หรอ")) {
      try {
        const res = await deleteProduct(token, id);
        toast.success("Deleted สินค้าเรียบร้อยแล้ว");
        getProduct(100);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">Create Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white text-gray-800 font-medium" value={form.title} onChange={handleOnChange} placeholder="Product Title" name="title" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <input className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white text-gray-800 font-medium" value={form.description} onChange={handleOnChange} placeholder="Description" name="description" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (฿)</label>
              <input type="number" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white text-gray-800 font-medium" value={form.price} onChange={handleOnChange} placeholder="0.00" name="price" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
              <input type="number" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white text-gray-800 font-medium" value={form.quantity} onChange={handleOnChange} placeholder="0" name="quantity" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white text-gray-800 font-medium cursor-pointer" name="categoryId" onChange={handleOnChange} required value={form.categoryId}>
                <option value="" disabled>Please Select Category</option>
                {categories.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="border-t-2 border-gray-100 pt-6 mt-6">
            <Uploadfile form={form} setForm={setForm} />
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-8 py-3 font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2">
            Add Product
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">No.</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-right">Stock</th>
                <th className="px-6 py-4 text-right">Sold</th>
                <th className="px-6 py-4">Updated</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 text-gray-500 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">
                    {item.images.length > 0 ? (
                      <img className="w-16 h-16 rounded-xl shadow-sm object-cover border border-gray-100" src={item.images[0].url} alt={item.title} />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center shadow-sm text-xs text-gray-400 font-medium border border-gray-200">No Img</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{item.title}</td>
                  <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{item.description}</td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-600">฿{numberFormat(item.price)}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-700">{item.quantity}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-700">{item.sold}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{dateFormat(item.updatedAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                        <Link to={"/admin/product/" + item.id} className="p-2 bg-yellow-50 text-yellow-600 hover:bg-yellow-500 hover:text-white rounded-lg transition-all shadow-sm">
                            <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-all shadow-sm">
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormProduct;