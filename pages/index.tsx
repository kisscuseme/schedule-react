import SignIn from "./signin";
import Schedule from "./schedule";
import { firebaseAuth } from "@/services/firebase/firebase";
import { useRecoilState } from "recoil";
import { isLogedInState, userInfoState } from "@/states/states";
import { signOut } from "firebase/auth";

export default function Home() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLogedIn, setIsLogedIn] = useRecoilState(isLogedInState);
  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      if (!userInfo) {
        setUserInfo({
          uid: user.uid,
          name: user.displayName as string,
          email: user.email as string
        });
      }
      if(isLogedIn === null) setIsLogedIn(true);
    } else {
      if(isLogedIn === null) setIsLogedIn(false);
    }
  })();

  if(isLogedIn === null) return <div>loading...</div>
  else {
    if(isLogedIn) return <Schedule/>
    else return <SignIn/>;
  }
}
