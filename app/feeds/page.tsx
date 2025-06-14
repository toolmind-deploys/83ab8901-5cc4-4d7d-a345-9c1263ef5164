import React from 'react';

export default async function FeedsPage() {
  const response = await fetch('http://localhost:3000/api/feeds', {
    cache: 'no-store',
  });

  const data = await response.json();
  const feeds = data.feeds || [];

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Feeds</h1>
      {feeds.length === 0 ? (
        <p>No feeds found.</p>
      ) : (
        <ul className="space-y-4">
          {feeds.map((feed: any) => (
            <li key={feed.id} className="border rounded p-4">
              <h2 className="font-semibold">{feed.title}</h2>
              <p>Company: {feed.company}</p>
              <p>Job Type: {feed.jobType}</p>
              <p>Status: {feed.status}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
