import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, doc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';

export const dynamic = 'force-dynamic';

// Helper function to validate incoming request body for feed creation/update
function validateFeedData(data: any): string | null {
  if (!data || typeof data !== 'object') {
    return 'Invalid request body.';
  }

  if (!data.title || typeof data.title !== 'string') {
    return 'Missing or invalid field: title';
  }

  // Additional validation checks can be added here
  return null;
}

export async function GET() {
  try {
    initFirebaseAdminSDK();
    const db = getFirestore();
    const feedsRef = collection(db, 'feeds');
    const snapshot = await getDocs(feedsRef);

    const feeds: any[] = [];
    snapshot.forEach((docSnap) => {
      feeds.push({ id: docSnap.id, ...docSnap.data() });
    });

    return NextResponse.json({ success: true, data: feeds }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    initFirebaseAdminSDK();
    const db = getFirestore();

    const body = await request.json();
    const errorMessage = validateFeedData(body);
    if (errorMessage) {
      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    }

    // Create new feed doc with a generated ID
    const newDocRef = doc(collection(db, 'feeds'));

    const newFeed = {
      ...body,
      createdAt: Timestamp.now().toMillis(),
      updatedAt: Timestamp.now().toMillis()
    };

    await setDoc(newDocRef, newFeed);

    return NextResponse.json({ success: true, data: { id: newDocRef.id, ...newFeed } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    initFirebaseAdminSDK();
    const db = getFirestore();

    const body = await request.json();

    if (!body.id || typeof body.id !== 'string') {
      return NextResponse.json({ success: false, error: 'Missing or invalid field: id' }, { status: 400 });
    }

    const errorMessage = validateFeedData(body);
    if (errorMessage) {
      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    }

    const docRef = doc(db, 'feeds', body.id);

    const updatedFeedData = {
      ...body,
      updatedAt: Timestamp.now().toMillis()
    };

    await updateDoc(docRef, updatedFeedData);

    return NextResponse.json({ success: true, data: updatedFeedData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    initFirebaseAdminSDK();
    const db = getFirestore();

    // Expecting { id: '...'} in body
    const body = await request.json();

    if (!body.id || typeof body.id !== 'string') {
      return NextResponse.json({ success: false, error: 'Missing or invalid field: id' }, { status: 400 });
    }

    const docRef = doc(db, 'feeds', body.id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true, message: 'Feed deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
