import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Alert
} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {useRouter} from "expo-router";
import {useState} from "react";
import FormField from "@/components/FormField";
import axios from "axios";
import buttonStyles from "@/styles/buttonStyles";

const RegisterScreen = () => {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", userName: "", password: "" });

    const handleChange = (field: string, value: string) => {
        setForm({...form, [field]: value});
    }

    const handleSignUp = async () => {
        console.log("Sign Up data:", form);
        try {
            const response = await axios.post("https://ramprage-api.itstep.click/api/Auth/register", form);
            const { data } = response;
            console.log("Returned data:", data);

            if (data.success) {
                Alert.alert(
                    "Success",
                    "Successfully registered!",
                    [],
                    { cancelable: true }
                );
                setForm({ email: "", userName: "", password: "" });
            } else {
                Alert.alert(
                    "Error",
                    data.message || "Registration failed. Please try again.",
                    [],
                    { cancelable: true }
                );
                setForm(prev => ({ ...prev, password: "" }));
            }
        } catch (e: any) {
            console.error("Sign Up Error:", e.response?.data || e.message);
            Alert.alert(
                "Error",
                e.response?.data?.message || "An error occurred during registration.",
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
                            <Text className="text-3xl font-bold mb-6 text-white">Register</Text>

                            <FormField
                                title={"Email"}
                                value={form.email}
                                placeholder={"Enter email..."}
                                handleChangeText={(value: string) => handleChange("email", value)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <FormField
                                title={"Username"}
                                value={form.userName}
                                placeholder={"Enter username..."}
                                handleChangeText={(value: string) => handleChange("userName", value)}
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
                                onPress={handleSignUp}
                                style={buttonStyles.mainBtn}
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.replace("/login")}
                                style={buttonStyles.secBtn}
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Already have an account? Sign In Here!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default RegisterScreen;