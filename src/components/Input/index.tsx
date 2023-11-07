import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Types

type InputProps = {
  handleAdd: (task: string) => void;
};

export function Input({ handleAdd }: InputProps) {
  // States
  const [text, setText] = useState("");

  // Handle
  const handleAddTask = () => {
    handleAdd(text);
    setText("");
  };

  const handleSetText = (text: string) => {
    setText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Descrição da tarefa"
        placeholderTextColor={"#808080"}
        onChangeText={handleSetText}
        value={text}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleAddTask}
      >
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={24}
          color={"#F2F2F2"}
        />
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    gap: 6,
    top: 142,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  input: {
    fontSize: 16,
    padding: 16,
    flex: 1,
    backgroundColor: "#262626",
    borderWidth: 1,
    borderColor: "#5E60CE",
    borderRadius: 6,
    color: "#F2F2F2",
  },
  button: {
    padding: 18,
    backgroundColor: "#1E6F9F",
    borderRadius: 6,
  },
});
