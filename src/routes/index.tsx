import React, { useEffect, useState } from 'react';
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { SignIn } from '../screens/SignIn';

interface UserProps {
  uid: string;
}
export function Routes() {

  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user)
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <AppRoutes />
      ) : (
        <SignIn />
      )}
    </NavigationContainer>
  )
}