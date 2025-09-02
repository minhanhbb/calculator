import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

type ButtonProps = {
  name: string;
  onPress?: () => void;
  type?: "number" | "operator" | "function";
  flex?: number;
};

const CalcButton: React.FC<ButtonProps> = ({ name, onPress, type, flex }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "operator" ? styles.buttonOperator : null,
        type === "function" ? styles.buttonFunction : null,
        { flex: flex || 1 },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          type === "operator" ? styles.buttonTextOperator : null,
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [dark, setDark] = useState(false);

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (input: string) => {
    setExpression(expression + input);
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const handleDelete = () => {
    setExpression(expression.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      const evalResult = eval(expression); // ⚠️ demo thôi, sản phẩm thực nên dùng mathjs
      setResult(evalResult.toLocaleString());
    } catch {
      setResult("Error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display */}
      <View style={styles.display}>
        <Text style={styles.expression}>{expression}</Text>
        {result !== "" && <Text style={styles.result}>{result}</Text>}
      </View>

      {/* Hàng 1 */}
      <View style={styles.row}>
        <CalcButton name="AC" type="function" onPress={handleClear} />
        <CalcButton name="⌫" type="function" onPress={handleDelete} />
        <CalcButton name="%" type="function" onPress={() => handlePress("%")} />
        <CalcButton name="/" type="operator" onPress={() => handlePress("/")} />
      </View>

      {/* Hàng 2 */}
      <View style={styles.row}>
        <CalcButton name="7" type="number" onPress={() => handlePress("7")} />
        <CalcButton name="8" type="number" onPress={() => handlePress("8")} />
        <CalcButton name="9" type="number" onPress={() => handlePress("9")} />
        <CalcButton name="X" type="operator" onPress={() => handlePress("*")} />
      </View>

      {/* Hàng 3 */}
      <View style={styles.row}>
        <CalcButton name="4" type="number" onPress={() => handlePress("4")} />
        <CalcButton name="5" type="number" onPress={() => handlePress("5")} />
        <CalcButton name="6" type="number" onPress={() => handlePress("6")} />
        <CalcButton name="-" type="operator" onPress={() => handlePress("-")} />
      </View>

      {/* Hàng 4 */}
      <View style={styles.row}>
        <CalcButton name="1" type="number" onPress={() => handlePress("1")} />
        <CalcButton name="2" type="number" onPress={() => handlePress("2")} />
        <CalcButton name="3" type="number" onPress={() => handlePress("3")} />
        <CalcButton name="+" type="operator" onPress={() => handlePress("+")} />
      </View>

      {/* Hàng 5 */}
      <View style={styles.row}>
        {/* 0 chiếm 2 cột */}
        <CalcButton
          name="0"
          type="number"
          flex={2}
          onPress={() => handlePress("0")}
        />
        <CalcButton name="." type="number" onPress={() => handlePress(".")} />
        <CalcButton name="=" type="operator" onPress={handleEqual} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f16",
    padding: 16,
    justifyContent: "flex-end",
  },
  display: {
    marginBottom: 30,
    padding: 20,
    alignItems: "flex-end",
  },
  expression: {
    fontSize: 28,
    color: "#9aa0b1",
  },
  result: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1c1f27",
    paddingVertical: 20,
    borderRadius: 50,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 22,
    color: "#fff",
  },
  buttonOperator: {
    backgroundColor: "#1e4fff",
  },
  buttonTextOperator: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonFunction: {
    backgroundColor: "#2a2e3a",
  },
});

export default App;
