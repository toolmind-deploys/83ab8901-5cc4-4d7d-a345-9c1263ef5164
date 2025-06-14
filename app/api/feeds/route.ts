import { firestore } from 'firebase-admin';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

initFirebaseAdminSDK();
const fsdb = firestore();

export async function GET(req: NextRequest) {
    try {
        const snapshot = await fsdb.collection('feeds').get();

        const data = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });

        return NextResponse.json({ feeds: data });
    } catch (error: any) {
        return NextResponse.json({ status: 500, error: error.message });
    }
}
