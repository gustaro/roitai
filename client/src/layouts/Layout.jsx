import { Outlet } from 'react-router-dom'
import MainNav from '../components/MainNav'

export default function Layout() {
  return <><MainNav /><main className="mx-auto mt-4 max-w-7xl px-4"><Outlet /></main></>
}
