import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import API from "../services/api";

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN
  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      if (res?.data?.success) {
        navigation?.replace?.("Products");
      } else {
        alert(res?.data?.message || "Login failed");
      }
    } catch (err) {
      console.log("Login error:", err);
      alert("Login error");
    }
  };

  // SIGNUP
  const signup = async () => {
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert(res?.data?.message || "Signup successful");
    } catch (err) {
      console.log("Signup error:", err);
      alert("Signup error");
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text>Name (for signup)</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Button title="Login" onPress={login} />
      <View style={{ marginTop: 10 }} />
      <Button title="Signup" onPress={signup} />
    </View>
  );
}
