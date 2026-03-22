import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";

const CANVAS_WIDTH = 80;
const CANVAS_HEIGHT = 24;

const FRAME_CONTENT = [
  "__________________________^^^^^^^^^^^^^^^^^^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "__________________________^^^^^^^^^^^^^^^^^^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "__________________________^^^^^^^^^^^^^^^^^^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "__________________________^^^^^^^^^^^^^^^^^^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________██╗__██╗███████╗██╗^^^██╗^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________██║__██║██╔════╝╚██╗^██╔╝^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________███████║█████╗^^^╚████╔╝^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________██╔══██║██╔══╝^^^^╚██╔╝^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________██║__██║███████╗^^^██║^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________╚═╝__╚═╝╚══════╝^^^╚═╝^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "__________________________^^^^^^^^^^^^^^^^^^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________██████╗^^██████╗^^██████╗^██╗]]██╗██╗███████╗]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________██╔══██╗██╔═══██╗██╔═══██╗██║]██╔╝██║██╔════╝]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________██████╔╝██║   ██║██║   ██║█████╔╝ ██║█████╗]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________██╔═══╝^██║   ██║██║   ██║██╔═██╗ ██║██╔══╝]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________██║__^^^╚██████╔╝╚██████╔╝██║]]██╗██║███████╗]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "_____________________╚═╝__^^^^╚═════╝^^╚═════╝^╚═╝]]╚═╝╚═╝╚══════╝]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "__________________________^^^^^^^^^^^^^^^^^^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "__________________________^^^^^^^^^^^^^^^^^^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "__________________________^^^^^^^^^^^^^^^^^^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\",
  "__________________________^^^^^^^^^^^^^^^^^^^^^]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\"
];

function buildFgGradient(): Record<string, string> {
  const colors: Record<string, string> = {};
  for (let row = 0; row < CANVAS_HEIGHT; row++) {
    for (let col = 0; col < CANVAS_WIDTH; col++) {
      const t = col / (CANVAS_WIDTH - 1);

      const r = Math.round(0xe0 + t * (0x38 - 0xe0));
      const g = Math.round(0xf2 + t * (0xbd - 0xf2));
      const b = Math.round(0xfe + t * (0xf8 - 0xfe));

      colors[`${col},${row}`] = `rgb(${r},${g},${b})`;
    }
  }
  return colors;
}

function buildBgGradient(): Record<string, string> {
  const colors: Record<string, string> = {};
  for (let row = 0; row < CANVAS_HEIGHT; row++) {
    for (let col = 0; col < CANVAS_WIDTH; col++) {
      const t = col / (CANVAS_WIDTH - 1);

      const r = Math.round(0x1e + t * (0x93 - 0x1e));
      const g = Math.round(0x3a + t * (0xc5 - 0x3a));
      const b = Math.round(0x8a + t * (0xfd - 0x8a));

      colors[`${col},${row}`] = `rgb(${r},${g},${b})`;
    }
  }
  return colors;
}

const FG_COLORS = buildFgGradient();
const BG_COLORS = buildBgGradient();

const CELL_FONT_SIZE = 5.5;
const CELL_WIDTH = CELL_FONT_SIZE * 0.62;
const CELL_HEIGHT = CELL_FONT_SIZE * 1.25;


export default function AsciiAnimation() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const shimmerTranslate = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <Animated.View
      style={{
        // transform: [{ scale: pulseAnim }],
        borderRadius: 0,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(30, 58, 138, 0.25)",
          padding: 2,
          borderRadius: 0,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.2)",
          overflow: "hidden",
        }}
      >
        <View>
          {FRAME_CONTENT.map((line, rowIndex) => {
            const chars = Array.from(line.padEnd(CANVAS_WIDTH, " ")).slice(
              0,
              CANVAS_WIDTH
            );

            return (
              <View
                key={rowIndex}
                style={{ flexDirection: "row", height: CELL_HEIGHT }}
              >
                {chars.map((char, colIndex) => {
                  const key = `${colIndex},${rowIndex}`;
                  const isBlock = char === "█";

                  const fg = isBlock
                    ? "rgb(255, 230, 80)" 
                    : FG_COLORS[key];

                  const bg = BG_COLORS[key];

                  return (
                    <Text
                      key={colIndex}
                      style={{
                        fontFamily: "monospace",
                        fontSize: CELL_FONT_SIZE,
                        lineHeight: CELL_HEIGHT,
                        width: CELL_WIDTH,
                        height: CELL_HEIGHT,
                        color: fg,
                        backgroundColor: bg,
                        textAlign: "center",

                        textShadowColor: isBlock
                          ? "rgba(255, 230, 80, 0.9)"
                          : "rgba(147,197,253,0.8)",
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 2,
                      }}
                    >
                      {char}
                    </Text>
                  );
                })}
              </View>
            );
          })}

          <Animated.View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 120,
              height: "100%",
              backgroundColor: "rgba(255,255,255,0.08)",
              transform: [{ translateX: shimmerTranslate }],
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
}