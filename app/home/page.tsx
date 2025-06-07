import React from 'react';

async function fetchFeeds() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/home`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch feeds: ${res.statusText}`);
  }

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch feeds');
  }

  return data.data;
}

export default async function HomePage() {
  // Since this is a server component, we can fetch data directly.
  let feeds: any[] = [];
  try {
    feeds = await fetchFeeds();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Feeds</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">Title</th>
              <th className="p-2 border border-gray-300">Company</th>
              <th className="p-2 border border-gray-300">Status</th>
              <th className="p-2 border border-gray-300">Job Type</th>
              <th className="p-2 border border-gray-300">Created At</th>
              <th className="p-2 border border-gray-300">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {feeds.map((feed) => (
              <tr key={feed.id} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300">{feed.id}</td>
                <td className="p-2 border border-gray-300">{feed.title || ''}</td>
                <td className="p-2 border border-gray-300">{feed.company || ''}</td>
                <td className="p-2 border border-gray-300">{feed.status || ''}</td>
                <td className="p-2 border border-gray-300">{feed.jobType || ''}</td>
                <td className="p-2 border border-gray-300">{feed.createdAt ? new Date(feed.createdAt).toLocaleString() : ''}</td>
                <td className="p-2 border border-gray-300">{feed.updatedAt ? new Date(feed.updatedAt).toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
