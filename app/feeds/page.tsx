import React from "react";

export default async function FeedsPage() {
    const response = await fetch("http://localhost:3000/api/feeds", {
        cache: "no-store"
    });
    const feeds = await response.json();

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold">Feeds</h1>
            <section className="mt-4 space-y-4">
                {feeds && feeds.length > 0 ? (
                    feeds.map((feed: any) => (
                        <article key={feed.id} className="border p-2 rounded">
                            <h2 className="font-semibold">{feed.title}</h2>
                            <p>Status: {feed.status}</p>
                            <p>Company: {feed.company}</p>
                            <p>Job Type: {feed.jobType}</p>
                            <p>Created At: {new Date(feed.createdAt).toLocaleString()}</p>
                            <p>Description: {feed.description}</p>
                        </article>
                    ))
                ) : (
                    <p>No feeds found.</p>
                )}
            </section>
        </main>
    );
}
