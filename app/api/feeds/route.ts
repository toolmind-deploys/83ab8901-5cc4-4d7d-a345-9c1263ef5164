import { NextRequest, NextResponse } from 'next/server';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';
import { getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export async function GET(request: NextRequest) {
  initFirebaseAdminSDK();

  const db = getFirestore();
  const snapshot = await db.collection('feeds').get();
  const feeds = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });

  return NextResponse.json(feeds);
}
