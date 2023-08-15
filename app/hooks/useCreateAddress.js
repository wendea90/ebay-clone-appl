const useCreateAddress = async (details) => {

    //1.when url is create 
    let url = 'create'
    //2.if there is an address id being passed that means we want to set the end URL to update
    if (details.addressId) url = 'update'

    //3.from api---
    const response = await fetch(`/api/address/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            addressId: details.addressId,
            name: details.name,
            address: details.address,
            zipcode: details.zipcode,
            city: details.city,
            country: details.country,
        })
    })

    const data = await response.json();

    return data
}

export default useCreateAddress;