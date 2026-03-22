import {
  useFonts,
  BubblegumSans_400Regular,
} from "@expo-google-fonts/bubblegum-sans";
import { Text, View, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import AsciiAnimation from "../components/AsciiAnimation";

export default function Index() {
  const [fontsLoaded] = useFonts({
    BubblegumSans_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 items-center justify-center px-6 bg-blue-400 gap-4">

      <View className="mb-4 w-full">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <AsciiAnimation />
        </ScrollView>
      </View>

      <Text
        style={{ fontFamily: "BubblegumSans_400Regular" }}
        className="text-white text-4xl text-center drop-shadow-lg"
      >
        PookieMon Cards
      </Text>

      <Text
        style={{ fontFamily: "BubblegumSans_400Regular" }}
        className="text-white text-base text-center opacity-90"
      >
        Create your own legendary cards 
      </Text>

      <Text
        style={{ fontFamily: "BubblegumSans_400Regular" }}
        className="text-white text-sm text-center opacity-70 px-6"
      >
        Upload images, customize abilities, and build your own PookieMon card
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