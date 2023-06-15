import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import CardComponent from "./components/CardComponent";
import React, {useEffect, useState} from "react";
import {Article} from "./interfaces/Article";
import axios from "axios";
import { Link } from 'react-router-dom';

function Home() {

    const [Articles, setArticles] = useState<Article[]>([])

    useEffect(() => {
        getArticles();
    })

    async function getArticles(): Promise<void> {
        const cacheName = 'my-api-cache';
        const cache = await caches.open(cacheName);
        const cacheResponse = await cache.match(`https://jsonplaceholder.typicode.com/posts`);
        if(cacheResponse) {
            const cachedData = await cacheResponse.json() as Article;
            setArticles(cachedData.data);
        }
        else {
            axios.get("https://jsonplaceholder.typicode.com/posts")
                .then(data => {
                    setArticles(data.data)
                    cache.put(`https://jsonplaceholder.typicode.com/posts`, new Response(JSON.stringify(data)));
                })
                .catch(e => {
                    alert("Aucune connexion");
                })
        }
    }

    return (
        <div className='m-0 bg-slate-300'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Infos
                    </Typography>
                    <Button color="inherit" onClick={() => alert("Cette PWA charge et affiche les articles déjà consultés")}>Help ?</Button>
                </Toolbar>
            </AppBar>
            <div className='container place-content-center flex flex-col mx-auto p-10'>
                {Articles.map(p => (
                    <Link to={`/article/${p.id}`}>
                        <CardComponent id={p.id} title={p.title} body={p.body} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home