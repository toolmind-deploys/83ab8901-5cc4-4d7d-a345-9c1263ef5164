import { firestore } from "firebase-admin";
import { initFirebaseAdminSDK } from "@/config/firebase-admin-config";
import { NextRequest, NextResponse } from "next/server";

initFirebaseAdminSDK();
const fsdb = firestore();

export async function GET(req: NextRequest) {
  try {
    const snapshot = await fsdb.collection("feeds").get();
    const feeds = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json(feeds);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newDocRef = await fsdb.collection("feeds").add(body);
    return NextResponse.json({ id: newDocRef.id, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
