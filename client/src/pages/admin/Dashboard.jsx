import { useEffect, useState } from 'react'
import { getListAllUsers, getOrdersAdmin } from '../../api/admin'
import { listProduct } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { numberFormat } from '../../utils/number'
import { Users, Package, ClipboardList, Wallet } from 'lucide-react'

export default function Dashboard() {
  const token = useEcomStore((s) => s.token)
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, sales: 0 })
  useEffect(() => {
    Promise.all([getListAllUsers(token), listProduct(100), getOrdersAdmin(token)]).then(([u,p,o]) => {
      const orders = o.data || []
      setStats({ users: u.data.length, products: p.data.length, orders: orders.length, sales: orders.reduce((sum,x)=>sum+Number(x.cartTotal||0),0) })
    }).catch(() => {})
  }, [token])

  const cards = [
    { title: 'Users', value: stats.users, icon: Users, color: 'from-blue-500 to-indigo-600' },
    { title: 'Products', value: stats.products, icon: Package, color: 'from-emerald-400 to-green-600' },
    { title: 'Orders', value: stats.orders, icon: ClipboardList, color: 'from-amber-400 to-orange-500' },
    { title: 'Sales', value: `฿${numberFormat(stats.sales)}`, icon: Wallet, color: 'from-fuchsia-500 to-purple-600' }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Dashboard Overview</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.title} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.color} p-6 shadow-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-${c.color.split('-')[1]}-500/30 transition-all duration-300 text-white`} >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 opacity-20 blur-2xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">{c.title}</p>
                <p className="mt-2 text-3xl font-black">{c.value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <c.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
