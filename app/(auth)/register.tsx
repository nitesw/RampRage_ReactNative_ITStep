import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Alert, Image
} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import {useRouter} from "expo-router";
import {useState} from "react";
import FormField from "@/components/FormField";
import axios from "axios";
import buttonStyles from "@/styles/buttonStyles";
import {useRegisterMutation} from "@/services/api.auth";
import * as ImagePicker from 'expo-image-picker';
import {saveToSecureStore} from "@/utils/secureStore";
import {IUser, IUserPayload} from "@/interfaces/user";
import {jwtParse} from "@/utils/jwtParse";
import {setCredentials} from "@/redux/user/userSlice";
import {useAppDispatch} from "@/redux/store";

const RegisterScreen = () => {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", userName: "", password: "", confirmPassword: "" });

    const [image, setImage] = useState<string | null>(null);
    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useAppDispatch();

    const handleChange = (field: string, value: string) => {
        setForm({...form, [field]: value});
    }

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permission.granted) {
            alert("Gallery permission is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    }

    const handleSignUp = async () => {
        console.log("Sign Up data:", form);

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const formData = new FormData();
        formData.append("Email", form.email);
        formData.append("UserName", form.userName);
        formData.append("Password", form.password);

        if(image) {
            const fileName = image.split('/').pop()!;
            const match = /\.(\w+)$/.exec(fileName);
            const ext = match?.[1];
            const mimeType = `image/${ext}`;

            formData.append("Image", {
                uri: image,
                name: fileName,
                type: mimeType,
            } as any);
        }

        try {
            const response = await register(formData).unwrap();
            console.log("Returned data:", response);

            if (response.token) {
                await saveToSecureStore('access-token', response.token);
                const userCredentials: IUserPayload = {
                    user: jwtParse(response.token) as IUser,
                    token: response.token
                }
                dispatch(setCredentials(userCredentials));

                Alert.alert(
                    "Success",
                    "Successfully registered!",
                    [],
                    { cancelable: true }
                );
                setForm({ email: "", userName: "", password: "", confirmPassword: "" });
                router.replace("/profile");
            }
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
            setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
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
                        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20, paddingTop: 20}}
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
                            <FormField
                                title={"Confirm Password"}
                                value={form.confirmPassword}
                                placeholder={"Re-enter password..."}
                                handleChangeText={(value: string) => handleChange("confirmPassword", value)}
                                secureTextEntry={true}
                            />

                            <TouchableOpacity
                                onPress={pickImage}
                                style={buttonStyles.uploadBtn}
                                >
                                <Text className="text-white text-center text-lg font-bold">
                                    Upload Profile Picture
                                </Text>
                            </TouchableOpacity>

                            {image && (
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: 100, height: 100, marginBottom: 4 }}
                                />
                            )}

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