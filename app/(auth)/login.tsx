import {
    Alert,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView, StyleSheet,
    Text, TouchableOpacity,
    View
} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {useRouter} from "expo-router";
import {useState} from "react";
import FormField from "@/components/FormField";
import {useLoginMutation} from "@/services/api.auth";
import {useAppDispatch} from "@/redux/store";
import {saveToSecureStore} from "@/utils/secureStore";
import {setCredentials} from "@/redux/user/userSlice";
import {IUser, IUserPayload} from "@/interfaces/user";
import {jwtParse} from "@/utils/jwtParse";
import buttonStyles from "@/styles/buttonStyles";

const LoginScreen = () => {
    const router = useRouter();
    const [form, setForm] = useState({ identifier: "", password: "" });

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const handleChange = (field: string, value: string) => {
        setForm({...form, [field]: value});
    }

    const handleSignIn = async () => {
        console.log("Sign In data:", form);
        try {
            const res = await login(form).unwrap();
            console.log("Returned data:", res);

            await saveToSecureStore('access-token', res.token);
            const userCredentials: IUserPayload = {
                user: jwtParse(res.token) as IUser,
                token: res.token
            }
            dispatch(setCredentials(userCredentials));

            Alert.alert(
                "Success",
                "Successfully logged in!",
                [],
                { cancelable: true }
            );
            setForm({ identifier: "", password: "" });
            router.replace("/profile");
        } catch (err: any) {
            console.error("Full RTK Sign In Error:", err);
            const errorMessage =
                err?.data?.error
                || err?.error
                || "An error occurred during logging in.";

            Alert.alert(
                "Error",
                errorMessage,
                [],
                { cancelable: true }
            );
            setForm(prev => ({ ...prev, password: "" }));
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                            <Text className="text-3xl font-bold mb-6 text-white">Login</Text>
                            
                            <FormField
                                title={"Username or Email"}
                                value={form.identifier}
                                placeholder={"Enter username or email..."}
                                handleChangeText={(value: string) => handleChange("identifier", value)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                />
                            <FormField
                                title={"Password"}
                                value={form.password}
                                placeholder={"Enter password..."}
                                handleChangeText={(value: string) => handleChange("password", value)}
                                secureTextEntry={true}
                            />

                            <TouchableOpacity
                                onPress={handleSignIn}
                                style={buttonStyles.mainBtn}
                                >
                                <Text className="text-white text-center text-lg font-bold">
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.replace("/register")}
                                style={buttonStyles.secBtn}
                            >
                                <Text className="text-gray-200 text-center text-lg font-bold">
                                    Don't have an account? Sign Up Here!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default LoginScreen;