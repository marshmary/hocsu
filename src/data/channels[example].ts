/**
 * Code mẫu, xong project thì xóa
 */
import {
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "~/utils/firebase/firebase-config";

// Get collection
const channelsCollectionRef = collection(db, "channels");

export const getChannels: () => Promise<Channel[]> = async () => {
    const data = await getDocs(channelsCollectionRef);

    // The return data is freaking urgly, so we have to re-format it to human readable format.
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Channel[];
};

export const createChannel = async (channel: ChannelCreateDto) => {
    // Upload image
    const imgRef = ref(storage, channel.avatar.name);
    const snapshot = await uploadBytes(imgRef, channel.avatar);

    const channelUpload: ChannelUploadDto = {
        ...channel,
        avatar: await getDownloadURL(snapshot.ref), // Get url after uploaded
    };

    // New document
    const res = await addDoc(channelsCollectionRef, channelUpload);

    return res;
};

export const deleteChannel = async (id: string) => {
    // Get the doc
    const channelDoc = doc(db, "channels", id);

    // --- check null ---
    // Khúc này t quên check trường hợp éo lấy ra dc 🤡

    await deleteDoc(channelDoc);
};

/**
 * Đáng lẽ đống này trong .d.ts
 */
type Provider = "youtube" | "google" | "bilibili" | "discord";

interface Channel {
    id: string;
    title: string;
    avatar: string;
    provider: Provider;
    description: string;
    url: string;
    displayOrder: number | string;
}

interface ChannelCreateDto {
    title: string;
    avatar: File;
    provider: Provider;
    description: string;
    url: string;
    displayOrder: number | string;
}

interface ChannelUploadDto {
    title: string;
    avatar: string;
    provider: Provider;
    description: string;
    url: string;
    displayOrder: number | string;
}
