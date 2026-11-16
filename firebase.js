// Firebase bağlantısı. Bu bilgiler gizli değildir; güvenliği firestore.rules sağlar.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  initializeFirestore, persistentLocalCache, collection, addDoc,
  query, where, orderBy, limit, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWKi5cy-i7gXRvipsGzSQlVTsO1Z0xO1k",
  authDomain: "sigara-takip-d64de.firebaseapp.com",
  projectId: "sigara-takip-d64de",
  storageBucket: "sigara-takip-d64de.firebasestorage.app",
  messagingSenderId: "970827260325",
  appId: "1:970827260325:web:ecb8f27cee20389a1c484c"
};

const app = initializeApp(firebaseConfig);

// İnternet yokken de kayıt alınır, bağlantı gelince gönderilir.
let db;
try { db = initializeFirestore(app, { localCache: persistentLocalCache() }); }
catch { db = initializeFirestore(app, {}); }

const events = collection(db, "events");

export const dayKey = ts => {
  const d = new Date(ts);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};

// type: "craving" | "wait" | "passed" | "smoked"; via: "ask" | "manual" | "after-wait"
export function logEvent(type, via, ts = Date.now()) {
  const ev = { type, ts, day: dayKey(ts) };
  if (via) ev.via = via;
  return addDoc(events, ev);
}

export function watchToday(cb, onErr) {
  return onSnapshot(query(events, where("day", "==", dayKey(Date.now()))),
    s => cb(s.docs.map(d => d.data())), onErr);
}

export function watchRecent(cb, onErr) {
  return onSnapshot(query(events, orderBy("ts", "desc"), limit(1000)),
    s => cb(s.docs.map(d => d.data())), onErr);
}
