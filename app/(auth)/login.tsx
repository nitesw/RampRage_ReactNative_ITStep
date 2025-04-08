import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text, TouchableOpacity,
    View
} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {useRouter} from "expo-router";
import {useState} from "react";
import FormField from "@/components/FormField";;

const LoginScreen = () => {
    const router = useRouter();
    const [form, setForm] = useState({ initial: "", password: "" });

    const handleChange = (field: string, value: string) => {
        setForm({...form, [field]: value});
    }

    const handleSignIn = () => {
        console.log("SignIn", form);
    }

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
                                value={form.initial}
                                placeholder={"Enter username or email..."}
                                handleChangeText={(value: string) => handleChange("initial", value)}
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
                                className="w-full bg-blue-400 p-4 rounded-lg mt-4"
                                >
                                <Text className="text-white text-center text-lg font-bold">
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.replace("/register")}
                                className="w-full bg-gray-300 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
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