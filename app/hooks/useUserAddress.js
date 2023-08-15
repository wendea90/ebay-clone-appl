const useUserAddress = async () => {
    //1.set an empty object
    let address = {}
    //2.call our API b/c made endpint already
    let response = await fetch("/api/address/get")

    //3.if there is response we want to convert that to json & if there is a data set address to that data & if there is none the address just stsay as an empty object
    if (response) {
        let data = await response.json();
        if (data) address = data
    }

    //4.return address
    return address
}

export default useUserAddress;