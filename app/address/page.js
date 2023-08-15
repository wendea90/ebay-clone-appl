"use client"

import { AiOutlineLoading3Quarters } from "react-icons/ai"
import MainLayout from "../layouts/MainLayout"
import TextInput from "../components/TextInput"
import { useRouter } from "next/navigation"
import { useUser } from "../context/user"
import { useEffect, useState } from "react"
import useIsLoading from "../hooks/useIsLoading"
import useUserAddress from "../hooks/useUserAddress"
import { toast } from "react-toastify"
import useCreateAddress from "../hooks/useCreateAddress"
import ClientOnly from "../components/ClientOnly"

export default function Address() {

    //router and user for context
    const router = useRouter()
    const { user } = useUser()

    //add some states useState - means 
    const [addressId, setAddressId] = useState(null)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [isUpdatingAddress, setIsUpdatingAddress] = useState(false)
    const [error, setError] = useState({})

    //make our functions
    const showError = (type) => {
        if (Object.entries(error).length > 0 && error?.type == type) {
            return error.message
        }
        return ''
    }

    //2.useIsLoading hook
    const getAdddress = async () => {
        if (user?.id == null || user?.id == undefined) {
            //loading page from hooks useIsLoading.js&mainlayout.js&loading.js
            useIsLoading(false)
            return
        }

        //2.useUserAddress is a new hook 
        const response = await useUserAddress()
        if (response) {
            setTheCurrentAddres(response)
            useIsLoading(false)
            return
        }
        useIsLoading(false)
    }


    useEffect(() => {
        useIsLoading(true)
        getAdddress()
    }, [user])

    //use our state and setthecurrentaddress
    const setTheCurrentAddres = (result) => {
        setAddressId(result.id)
        setName(result.name)
        setAddress(result.address)
        setZipcode(result.zipcode)
        setCity(result.city)
        setCountry(result.country)
    }

    //validation for our text input
    const validate = () => {
        setError(null)
        setError({})
        let isError = false

        if (!name) {
            setError({ type: 'name', message: 'A name is required' })
            isError = true
        } else if (!address) {
            setError({ type: 'address', message: 'An address is required' })
            isError = true
        } else if (!zipcode) {
            setError({ type: 'zipcode', message: 'A zipcode is required' })
            isError = true
        } else if (!city) {
            setError({ type: 'city', message: 'A city is required' })
            isError = true
        } else if (!country) {
            setError({ type: 'country', message: 'A country is required' })
            isError = true
        }
        return isError
    }

    const submit = async (event) => {
        event.preventDefault();
        let isError = validate()

        if (isError) {
            toast.error(error.message, { autoClose: 3000 })
            return
        }

        try {
            setIsUpdatingAddress(true)

            const response = await useCreateAddress({
                addressId,
                name,
                address,
                zipcode,
                city,
                country
            })

            setTheCurrentAddres(response)
            setIsUpdatingAddress(false)

            toast.success('Address updated!', { autoClose: 3000 })

            router.push('/checkout')
        } catch (error) {
            setIsUpdatingAddress(false)
            console.log(error)
            alert(error)
        }
    }

    return (
        <>
            <MainLayout>
                <div
                    id="AddressPage"
                    className="mt-4 max-w-[600px] mx-auto px-2"
                >
                    <div className="mx-auto bg-white rounded-lg p-3">
                        <div className="text-xl text-bold mb-2">Address Details</div>

                        <form onSubmit={submit} >
                            <div className="mb-4">
                                <ClientOnly>
                                    <TextInput
                                        className="w-full"
                                        string={name}
                                        placeholder="Name"
                                        //prop(properties) is on update
                                        onUpdate={setName}
                                        // error="This is an error" is hard code
                                        error={showError('name')}
                                    />
                                </ClientOnly>
                            </div>

                            <div className="mb-4">
                                <ClientOnly>
                                    <TextInput
                                        className="w-full"
                                        string={address}
                                        placeholder="Address"
                                        onUpdate={setAddress}
                                        error={showError('address')}
                                    />
                                </ClientOnly>
                            </div>

                            <div className="mb-4">
                                <ClientOnly>
                                    <TextInput
                                        className="w-full mt-2"
                                        string={zipcode}
                                        placeholder="Zip Code"
                                        onUpdate={setZipcode}
                                        error={showError('zipcode')}
                                    />
                                </ClientOnly>
                            </div>

                            <div className="mb-4">
                                <ClientOnly>
                                    <TextInput
                                        className="w-full mt-2"
                                        string={city}
                                        placeholder="City"
                                        onUpdate={setCity}
                                        error={showError('city')}
                                    />
                                </ClientOnly>
                            </div>

                            <div>
                                <ClientOnly>
                                    <TextInput
                                        className="w-full mt-2"
                                        string={country}
                                        placeholder="Country"
                                        onUpdate={setCountry}
                                        error={showError('country')}
                                    />
                                </ClientOnly>
                            </div>

                            <button
                                type="submit"
                                //disable the button if address is updating or being created
                                disabled={isUpdatingAddress}
                                className={`
                                mt-6
                                w-full 
                                text-white 
                                text-lg 
                                font-semibold 
                                p-3 
                                rounded
                                ${isUpdatingAddress ? 'bg-blue-800' : 'bg-blue-600'}
                            `}
                            >
                                {/* Update Address this is hard code*/}
                                {!isUpdatingAddress
                                    ? <div>Update Address</div>
                                    : <div className="flex items-center justify-center gap-2">
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                        Please wait...
                                    </div>
                                }
                            </button>

                        </form>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

