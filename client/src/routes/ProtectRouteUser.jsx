import React, { useState, useEffect } from 'react'
import useEcomStore from '../store/ecom-store'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteUser = ({ element }) => {
    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(true)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)

    useEffect(() => {
        if (user && token) {
            setLoading(true)
            currentUser(token)
                .then((res) => {
                    setOk(true)
                    setLoading(false)
                })
                .catch((err) => {
                    setOk(false)
                    setLoading(false)
                })
        } else {
            setOk(false)
            setLoading(false)
        }
    }, [user, token])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Loading...</p>
                </div>
            </div>
        )
    }

    return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteUser