import React from "react";
import { cookies } from "next/headers";
import Home from "./Home";

// Define a type for the cookie object
interface CookieObject {
    [key: string]: any;
}

export default function About() {
    const cookieStore = cookies();
    const Cookie = cookieStore.get("tokenAuth") as CookieObject; // Cast it to CookieObject
    console.log(Cookie);
    console.log("server component");

    return (
        <>
            <h1>About page {new Date().toLocaleTimeString()} </h1>
            {/* Pass the cookie prop to Home */}
            <Home cookie={Cookie} />
        </>
    );
}
