// rafce
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm, images, onChange }) => {
    // Javascript
    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)

    const currentImages = form ? (form.images || []) : (images || [])

    const updateImages = (newImages) => {
        if (setForm) {
            setForm((prev) => ({ ...prev, images: newImages }))
        }
        if (onChange) {
            onChange(newImages)
        }
    }

    const handleOnChange = (e) => {
        const files = e.target.files
        if (files && files.length > 0) {
            setIsLoading(true)
            let allFiles = [...currentImages]
            let completedCount = 0

            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} บ่แม่นรูป`)
                    completedCount++
                    if (completedCount === files.length) setIsLoading(false)
                    continue
                }

                // Image Resize (quality set to 80 to prevent payload limit issues)
                Resize.imageFileResizer(
                    file,
                    720,
                    720,
                    "JPEG",
                    80,
                    0,
                    (data) => {
                        uploadFiles(token, data)
                            .then((res) => {
                                allFiles.push(res.data)
                                updateImages(allFiles)
                                toast.success('Upload image Success!!!')
                            })
                            .catch((err) => {
                                console.error(err)
                                const errMsg = err?.response?.data?.message || err?.message || 'Server Error'
                                toast.error(`Upload Error: ${errMsg}`)
                            })
                            .finally(() => {
                                completedCount++
                                if (completedCount === files.length) {
                                    setIsLoading(false)
                                }
                            })
                    },
                    "base64"
                )
            }
        }
    }

    const handleDelete = (public_id) => {
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = currentImages.filter((item) => item.public_id !== public_id)
                updateImages(filterImages)
                toast.success('Remove Image Success!!!')
            })
            .catch((err) => {
                console.error(err)
                const errMsg = err?.response?.data?.message || err?.message || 'Server Error'
                toast.error(`Remove Error: ${errMsg}`)
            })
    }

    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4 flex-wrap'>
                {isLoading && <Loader className='w-16 h-16 animate-spin' />}

                {/* Image */}
                {currentImages.map((item, index) => (
                    <div className='relative' key={index}>
                        <img
                            className='w-24 h-24 object-cover rounded-md hover:scale-105 transition-transform'
                            src={item.url}
                            alt={`Uploaded ${index}`}
                        />
                        <span
                            onClick={() => handleDelete(item.public_id)}
                            className='absolute top-0 right-0 bg-red-500 text-white px-2 py-0.5 rounded-md cursor-pointer hover:bg-red-600 font-bold'
                        >
                            X
                        </span>
                    </div>
                ))}
            </div>

            <div>
                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                    accept='image/*'
                />
            </div>
        </div>
    )
}

export default Uploadfile