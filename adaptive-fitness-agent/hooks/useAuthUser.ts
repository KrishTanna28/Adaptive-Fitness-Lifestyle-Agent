import { useEffect, useState } from "react";
import { onIdTokenChanged, type User } from "firebase/auth/react-native";

import { auth } from "../services/firebase";

type UseAuthUserResult = {
  user: User | null;
  loading: boolean;
};

export function useAuthUser(): UseAuthUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}
