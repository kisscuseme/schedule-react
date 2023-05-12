import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import SignIn from "./signin";
import Schedule from "./schedule";
import { UserType } from "@/services/firebase/user.type";

export default function Home() {
  const [user, setUser] = useState(null as UserType);
  const router = useRouter();
  useEffect(() => {
    // if(!user){
    //   setUser({
    //     name: "test",
    //     email: "test@mail.com"
    //   });
    // }
  }, [user]);

  return (
    <>
      {user?<Schedule/>:<SignIn/>}
    </>
  )
}
