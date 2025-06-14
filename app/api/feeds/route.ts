import { firestore } from 'firebase-admin';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

initFirebaseAdminSDK();
const db = firestore();

export async function GET(request: NextRequest) {
    try {
        const feedsRef = db.collection('feeds');
        const snapshot = await feedsRef
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();

        const feeds = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(feeds);
    } catch (error: any) {
        console.error('Error fetching feeds:', error);
        return NextResponse.json(
            { error: 'Failed to fetch feeds' },
            { status: 500 }
        );
    }
}