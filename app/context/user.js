"use client"

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
//w/c create client component client
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const Context = createContext();


const Provider = ({ children }) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [picture, setPicture] = useState(null);

    //helper function - create client compt client to supabase client
    const supabaseClient = createClientComponentClient()

    //check our current session - means user is already logged in or not
    const getCurrentSession = async () => {
        const res = await supabaseClient.auth.getSession()
        if (res && res.data.session) {
            return res.data.session
        }
        clearUser()
        return null
    }

    const getCurrentUser = async () => {
        if (id) return

        //1.get the user
        const res = await supabaseClient.auth.getUser()
        //2.if it exists
        if (res && res.data.user) {

            //3.put it in const
            const theUser = res.data.user

            //4.set the user and specific
            setUser(theUser)
            setId(theUser.id)
            setEmail(theUser.email)
            setName(theUser.identities[0].identity_data.name)
            setPicture(theUser.identities[0].identity_data.picture)
        }
    }

    useEffect(() => {
        const isUser = async () => {
            const currentSession = await getCurrentSession()
            if (currentSession) await getCurrentUser()
        }
        isUser()
    }, [])

    const signOut = async () => {
        await supabaseClient.auth.signOut()
        clearUser()
        router.push('/')
    }

    const clearUser = () => {
        setUser(null)
        setId(null)
        setEmail(null)
        setName(null)
        setPicture(null)
    }

    const exposed = { user, id, email, name, picture, signOut };

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;