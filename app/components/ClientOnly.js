'use client';

import { useEffect, useState } from "react";

export default function ClientOnly({ children }) {

    const [isClient, setIsClient] = useState(false)
    //setIsClient is true b/c we don't want this to load until the client side starts loading b/c we don't want to get the mismatch and...
    useEffect(() => setIsClient(true))

    return (<> {isClient ? <div>{children}</div> : null} </>);
};