import React, { useState } from 'react';
import auth from "@react-native-firebase/auth";

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  }

  function handleCreateUserAccount() {
    auth().createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Usuário criado com sucesso"))
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          return Alert.alert("Este email já está em uso. Escolha outro email para cadastrar");
        }

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Email inválido");
        }

        //Tratar outros códigos de erros

      });
  }

  async function handleSigninWithEmailAndPassword() {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error: any) {
      console.log(error.code)
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        return Alert.alert("Usuário não encontrado. Email ou senha inválida");
      }
    }
  }

  function handleForgotPassword() {
    auth().sendPasswordResetEmail(email)
      .then(() => Alert.alert("Enviamos um link no seu email para você redefinir sua senha"));
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSigninWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}