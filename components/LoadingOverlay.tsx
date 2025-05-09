import { ActivityIndicator, View, StyleSheet } from "react-native";

const LoadingOverlay = ({ visible }: { visible: boolean }) => {
    if (!visible) {
        return null;
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={80} color="white" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 150,
    },
    loaderContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default LoadingOverlay;
