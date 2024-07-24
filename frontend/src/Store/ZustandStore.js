import { create } from "zustand"; 
import { persist } from "zustand/middleware";

const useMyStore = create(
    persist(
      (set) => ({
        name: "", 
        id : 0,
        isLoggedIn: false,
        userType:"",
        login: (name,id , userType) => set(
          { 
            name,
            id, 
            userType,
            isLoggedIn: true 
          }), 

        logout: () => set({
            name:"",
            id:0,
            userType: "",
            isLoggedIn : false
         }), 
      }),
      {
        name: "my-storage", // Unique name for localStorage
        storage: localStorage, // Use localStorage to persist state
      }
    )
  );
 export default useMyStore