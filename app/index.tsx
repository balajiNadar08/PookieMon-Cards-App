import {
  useFonts,
  BubblegumSans_400Regular,
} from "@expo-google-fonts/bubblegum-sans";
import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import AsciiAnimation from "../components/AsciiAnimation"; // 👈 add this

export default function Index() {
  const [fontsLoaded] = useFonts({
    BubblegumSans_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 items-center justify-center px-6 bg-blue-400 gap-4">
      
      <View className="mb-4">
        <AsciiAnimation />
      </View>

      <Text
        style={{ fontFamily: "BubblegumSans_400Regular" }}
        className="text-white text-4xl text-center drop-shadow-lg"
      >
        PookieMon Cards
      </Text>

      <Link href="/create" asChild>
        <Pressable className="mt-6 px-6 py-3 rounded-full bg-white active:scale-95">
          <Text
            style={{ fontFamily: "BubblegumSans_400Regular" }}
            className="text-blue-400 text-lg"
          >
            Start Creating →
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}