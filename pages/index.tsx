import { firebaseAuth } from "@/services/firebase/firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLogedInState, showModalState, userInfoState } from "@/states/states";
import Schedule from "@/components/templates/Schedule";
import SignIn from "@/components/templates/Signin";
import { Alert } from "@/components/molecules/alert/Alert";
import { LoadingScreen } from "@/components/molecules/loadingScreen/LoadingScreen";

export default function Home() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLogedIn, setIsLogedIn] = useRecoilState(isLogedInState);
  const showModal = useRecoilValue(showModalState);

  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
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

  return (
    <>
      {
        (isLogedIn === null && <LoadingScreen/>) ||
        (isLogedIn === true && <Schedule/>) ||
        (isLogedIn === false && <SignIn/>)
      }
      <Alert
        title={showModal.title}
        content={showModal.content}
        show={showModal.show}
        callback={showModal.callback}
        confirm={showModal.confirm}
      />
    </>
  )
}
