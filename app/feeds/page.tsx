import { getFirestore } from 'firebase-admin/firestore';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';

export default async function FeedsPage() {
    const db = getFirestore(initFirebaseAdminSDK());

    // Fetch documents from the 'feeds' collection
    const snapshot = await db.collection('feeds').get();
    const feeds = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
    });

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Feeds</h1>
            <ul className="space-y-2">
                {feeds.map(feed => (
                    <li key={feed.id} className="border p-2 rounded">
                        <p className="font-semibold">{feed.title}</p>
                        <p className="text-gray-600">Company: {feed.company}</p>
                        <p><small>Status: {feed.status}</small></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
