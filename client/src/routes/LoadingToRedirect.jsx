import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount === 1) {
                    clearInterval(interval)
                    setRedirect(true)
                }
                return currentCount - 1
            })

        }, 1000)

        return () => clearInterval(interval)
    }, [])

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 p-4">
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4 border border-gray-100 dark:border-neutral-700">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold">
                    !
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">No Permission</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    คุณไม่มีสิทธิ์เข้าถึงหน้านี้ ระบบกำลังพาคุณกลับหน้าหลักใน <span className="font-bold text-red-500">{count}</span> วินาที...
                </p>
            </div>
        </div>
    )
}

export default LoadingToRedirect