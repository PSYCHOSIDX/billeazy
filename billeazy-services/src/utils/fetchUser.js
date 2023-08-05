import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const fetchUserData = async (user) => {
    
    const userId = user.uid;
    // console.log(user);
    const userCollectionRef = collection(db,`users/${userId}/details`);
    const q = query(userCollectionRef);
    const data = await getDocs(q);
    console.log(data);
    const newData = {
        ...data.docs[0]?.data(),
        id: data.docs[0]?.id,
    }
    return newData;
}
export {fetchUserData};