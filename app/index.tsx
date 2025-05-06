import {useEffect} from "react";
import {getValueFromSecureStore} from "@/utils/secureStore";
import {setCredentials} from "@/redux/user/userSlice";
import {IUser, IUserPayload} from "@/interfaces/user";
import {jwtParse} from "@/utils/jwtParse";
import {router} from "expo-router";
import { useAppDispatch } from "@/redux/store";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import ScrollView = Animated.ScrollView;
import buttonStyles from "@/styles/buttonStyles";

const WelcomeScreen = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        getValueFromSecureStore('access-token')
            .then((res) => {
                if (res) {
                    const userCredentials: IUserPayload = {
                        user: jwtParse(res) as IUser,
                        token: res
                    }
                    dispatch(setCredentials(userCredentials));
                    router.replace("/profile");
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View
                            className="w-full flex justify-center items-center my-6"
                            style={{
                                minHeight: Dimensions.get("window").height - 100,
                            }}
                        >
                            <Text className={"text-3xl font-bold mb-6 text-white"}>
                                Welcome to our app!
                            </Text>

                            <TouchableOpacity
                                onPress={() => router.replace("/login")}
                                style={buttonStyles.mainBtn}
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Log In to our app!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default WelcomeScreen