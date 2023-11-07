import React, { useMemo } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

export type DataProps = {
  cod: number;
  isActive: boolean;
  text: string;
};
export type ToDoListProps = {
  data: DataProps[];
  handleCheck: (cod: number) => void;
  handleRemove: (cod: number) => void;
  handleDeleteAll: () => void;
};

export function ToDoList({
  data,
  handleCheck,
  handleRemove,
  handleDeleteAll,
}: ToDoListProps) {
  
  // Memo
  const amountDone = useMemo(() => {
    return data.length <= 0 ? 0 : data.filter((item) => item.isActive).length;
  }, [data]);

  // handle
  const handleDelete = () => {
    Alert.alert(
      "ATENÇÃO",
      "Deseja realmente excluír todos os itens da lista?",
      [{ text: "Sim!", onPress: handleDeleteAll }, { text: "Não" }]
    );
  };

  const task = (item: DataProps, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.task}
        activeOpacity={0.7}
        onPress={() => handleCheck(item.cod)}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCheck(item.cod)}
        >
          <MaterialCommunityIcons
            name={item.isActive ? "check-circle" : "check-circle-outline"}
            size={24}
            color="#8284FA"
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.textTask,
            item.isActive && {
              textDecorationLine: "line-through",
              color: "#808080",
            },
          ]}
        >
          {item.text}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRemove(item.cod)}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color="#696969"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const emptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Entypo
          name="list"
          size={56}
          color="#696969"
          style={{ paddingVertical: 16 }}
        />
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#808080" }}>
          Você ainda não tem terefas cadastradas
        </Text>
        <Text style={{ fontSize: 14, color: "#808080" }}>
          Crie tarefas e organize seus itens a fazer
        </Text>
      </View>
    );
  };
  const HeaderContent = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 55,
        }}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: "#4EA8DE" }]}>Criadas</Text>
          <View style={styles.amount}>
            <Text style={styles.textAmount}>{data.length}</Text>
          </View>
        </View>
        <View style={styles.header}>
          <Text style={[styles.title, { color: "#8284FA" }]}>Concluídas</Text>
          <View style={styles.amount}>
            <Text style={styles.textAmount}>{amountDone}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <HeaderContent />

      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={(item) => item.cod.toString()}
        renderItem={({ item, index }) => task(item, index)}
        contentContainerStyle={{ gap: 8 }}
        ListEmptyComponent={emptyList}
        showsVerticalScrollIndicator={false}
      />
      {data.length > 0 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="trash-can"
            size={32}
            color={"#900f0f"}
          />
        </TouchableOpacity>
      )}
    </>
  );
}

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  task: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#262626",
    borderColor: "#333333",
    flexDirection: "row",
  },
  textTask: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#F2F2F2",
    flexWrap: "wrap",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  button: {
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#696969",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 8,
  },
  title: {
    color: "#4EA8DE",
    fontWeight: "bold",
    fontSize: 14,
  },
  amount: {
    backgroundColor: "#333333",
    borderRadius: 999,
  },
  textAmount: {
    color: "#D9D9D9",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  deleteButton: {
    width: "100%",
    backgroundColor: "#d4727b",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    fontSize: 24,
    color: "#900f0f",
  },
});
