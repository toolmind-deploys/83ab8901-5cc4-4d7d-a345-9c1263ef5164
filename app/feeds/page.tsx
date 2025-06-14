export default async function FeedsPage() {
  const res = await fetch('http://localhost:3000/api/feeds', {
    cache: 'no-store'
  });

  const feeds = await res.json();

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Feeds</h1>
      {feeds?.length > 0 ? (
        <ul className="space-y-4">
          {feeds.map((feed: any) => (
            <li key={feed.id} className="p-4 border border-gray-300 rounded">
              <h2 className="font-semibold">{feed.title}</h2>
              <p className="text-sm">Company: {feed.company}</p>
              <p className="text-sm">Job Type: {feed.jobType}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feeds found.</p>
      )}
    </main>
  );
}
