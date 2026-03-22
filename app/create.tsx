import { View, Text, Image } from "react-native";
import card1 from "../assets/images/card1.png";

const create = () => {
  return (
    <View className="bg-blue-400 flex-1 items-center justify-center">
      <Text className="text-white mb-4">CREATE CARD PAGE</Text>
      <Image
        source={card1}
        className="w-64 h-96"
        resizeMode="contain"
      />
    </View>
  );
};

export default create;