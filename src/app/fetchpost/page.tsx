"use client";
import { useState, useEffect } from "react";

export default function FetchPostsPage() {
    const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/api/external")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPosts(data.data);
                } else {
                    setError(data.message);
                }
            })
            .catch(() => setError("An unexpected error occurred"))
            .finally(() => setLoading(false));
    }, []);

    // Render Loading State
    if (loading) return <div>Loading...</div>;

    // Render Error State
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}
