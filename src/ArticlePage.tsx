import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from 'react-router';
import {Article} from "./interfaces/Article";
import axios from "axios";
import CardComponent from "./components/CardComponent";

function ArticlePage() {

    const { id } = useParams();

    useEffect(() => {
        getArticles();
    }, [])

    const [Article, setArticle] = useState<Article>({
        id: parseInt(id as string),
        body: "null",
        title: 0
    });

    async function getArticles(): Promise<void> {
        const cacheName = 'my-api-cache';
        const cache = await caches.open(cacheName);
        const cacheResponse = await cache.match(`https://jsonplaceholder.typicode.com/posts/${id}`);

        if (cacheResponse) {
            const cachedData = await cacheResponse.json() as Article;
            console.log(cachedData);
            setArticle(cachedData.data);
            console.log(Article)
        } else {
            console.log(id);
            axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(data => {
                    setArticle(data.data);
                    cache.put(`https://jsonplaceholder.typicode.com/posts/${id}`, new Response(JSON.stringify(data)));
                })
                .catch(e => {
                    alert(e);
                    navigate(-1);
                });
        }
    }

    const navigate = useNavigate();
    return (
        <div className='container place-content-center mx-auto flex flex-wrap p-10'>
            <CardComponent id={Article.id} title={Article.title} body={Article.body} />
        </div>
    )
}

export default ArticlePage;