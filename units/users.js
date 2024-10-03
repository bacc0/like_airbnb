// users.js
import { firestore } from "./firebase";
import { collection, getDocs } from "firebase/firestore"; // Modular imports

const getUsers = async () => {
  const usersCollection = collection(firestore, "Users"); // Get reference to 'users' collection
  const snapshot = await getDocs(usersCollection); // Fetch documents from the collection

  snapshot.docs.forEach((doc) => {
    console.log(doc.data());
  });
};

export { getUsers };
