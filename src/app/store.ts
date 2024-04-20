import { atom, useAtom } from "jotai";
import { getTodayDate } from "../utils/getTodaysDate";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getLinkedEvents = async () => {
  const q = query(collection(db, "liked-events"));
  let liked_events: string[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    liked_events.push(doc.data().event_id);
    console.log(doc.id, " => ", doc.data());
  });
  return liked_events;
};

export const startDateAtom = atom<string>(getTodayDate() + "T12:00");
export const endDateAtom = atom<string>(getTodayDate() + "T12:00");
export const categoryAtom = atom<string>("");
export const likedEventsAtom = atom<string[]>([]);
export const isMenuOpenAtom = atom(false);

export const useUpdateLikedEvents = () => {
  const [, setLikedEvents] = useAtom(likedEventsAtom);

  const updateLikedEvents = async () => {
    const likedEvents = await getLinkedEvents();
    setLikedEvents(likedEvents);
  };

  return updateLikedEvents;
};
