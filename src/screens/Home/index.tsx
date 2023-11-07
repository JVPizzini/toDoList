import React, { useState } from "react";
import { SafeAreaView, SafeAreaViewBase, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { StatusBar } from "expo-status-bar";
import { ToDoList, DataProps } from "../../components/ToDoList";

export function Home() {
  const [data, setData] = useState([] as DataProps[]);

  // handles
  const handleAdd = (task: string) => {
    if (task === "") return;

    setData((prev) => [
      ...prev,
      {
        cod: data.length <= 0 ? 1 : data[data.length - 1].cod + 1,
        isActive: false,
        text: task,
      },
    ]);
  };
  const handleRemove = (cod: number) => {
    setData((prev) => [...prev.filter((item) => item.cod !== cod)]);
  };

  const handleCheck = (cod: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.cod === cod ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleDeleteAll = () => {
    setData([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header />
      <Input handleAdd={handleAdd} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          width: "100%",
        }}
      >
        <ToDoList
          data={data}
          handleCheck={handleCheck}
          handleRemove={handleRemove}
          handleDeleteAll={handleDeleteAll}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    position: "relative",
    flex: 1,
    paddingBottom: 50,
  },
});
