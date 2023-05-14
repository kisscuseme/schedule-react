import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "./firebase";

const signIn = async (email: string, password: string) => {
  try {
    const curUserInfo = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return curUserInfo;
  } catch (error: any) {
    switch (error.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "이메일 주소 또는 비밀번호가 잘못되었습니다.";
      default:
        return "로그인 중 에러가 발생하였습니다.\n" + error.message;
    }
  }
};

const signUp = async (email: string, password: string) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return createdUser;
  } catch (error: any) {
    switch (error.code) {
      case "auth/weak-password":
        return "비밀번호는 6자리 이상이어야 합니다";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다";
      case "auth/email-already-in-use":
        return "이미 가입되어 있는 계정입니다";
      default:
        return "가입 중 에러가 발생하였습니다.\n" + error.message;
    }
  }
};

const logOut = async () => {
  try {
    await signOut(firebaseAuth);
    return true;
  } catch(error: any) {
    console.log("로그아웃 중 오류가 발생했습니다.\n" + error.message);
    return false;
  }
}

export { signIn, signUp, logOut }