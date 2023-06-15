
import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ArticlePage from "./ArticlePage";
import Home from "./Home"

function App() {

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((registration) => {
                console.log('ServiceWorker registered with scope:', registration.scope);
            }, (error) => {
                console.log('ServiceWorker registration failed:', error);
            });
        });
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "article/:id",
            element: <ArticlePage />
        }
    ])

    return <RouterProvider router={router} />
}

export default App