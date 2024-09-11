import { StyleSheet, useColorScheme, ActivityIndicator } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";

const HEADER_HEIGHT = 50;

export default function ParallaxFlatList({
  banner,
  headerImage,
  headerBackgroundColor,
  loading,
  ...rest
}) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value / 1.5,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.FlatList
        ref={scrollRef}
        scrollEventThrottle={16}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              style={{ marginTop: 30 }}
              animating={true}
              size="large"
              color="#00ff00"
            />
          ) : (
            <Animated.View>
              <Animated.Text>0 results</Animated.Text>
            </Animated.View>
          )
        }
        ListHeaderComponent={
          <Animated.View>
            <Animated.View
              style={[
                styles.header,
                { backgroundColor: headerBackgroundColor[colorScheme] },
                headerAnimatedStyle,
              ]}
            >
              {headerImage}
            </Animated.View>
            <Animated.View style={styles.content}>{banner}</Animated.View>
          </Animated.View>
        }
        {...rest}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
    // overflow: 'hidden',
  },
});
