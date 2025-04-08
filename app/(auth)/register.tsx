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
import FormField from "@/components/FormField";

const RegisterScreen = () => {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", username: "", password: "" });

    const handleChange = (field: string, value: string) => {
        setForm({...form, [field]: value});
    }

    const handleSignUp = () => {
        console.log("Sign Up data:", form);
        fetch("http://localhost:5124/api/Auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email,
                userName: form.username,
                password: form.password,
            })
        })
            .then(response => response.json())
            .then(res => {
                if (res.status === 200) {
                    console.log("Sign Up successfully");
                    setForm({...form, email: "", username: "", password: "" });
                }
                else
                    console.log("Something went wrong");
            })
            .catch((err) => { console.log("Error occurred: ", err); })
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
                                value={form.username}
                                placeholder={"Enter username..."}
                                handleChangeText={(value: string) => handleChange("username", value)}
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
                                className="w-full bg-blue-400 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.replace("/login")}
                                className="w-full bg-gray-300 p-4 rounded-lg mt-4"
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