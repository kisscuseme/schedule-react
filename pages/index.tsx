import { firebaseAuth } from "@/services/firebase/firebase";
import { useRecoilState } from "recoil";
import { isLogedInState, userInfoState } from "@/states/states";
import Schedule from "@/components/templates/Schedule";
import SignIn from "@/components/templates/SignIn";
import { LoadingScreen } from "@/components/molecules/loadingScreen/LoadingScreen";

export default function Home() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLogedIn, setIsLogedIn] = useRecoilState(isLogedInState);

  firebaseAuth.onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
      if (!userInfo) setUserInfo({
          uid: user.uid,
          name: user.displayName as string,
          email: user.email as string
        });
      if(isLogedIn === null) setIsLogedIn(true);
    } else {
      if(isLogedIn === null) setIsLogedIn(false);
    }
  })();

  if(isLogedIn === null) return <LoadingScreen/>
  else if(isLogedIn === true) return <Schedule/>
  else if(isLogedIn === false) return <SignIn/>
}
