import { useState } from "react";
import { useRouter } from "expo-router";
import { useCreateCategoryMutation } from "@/services/api.category";
import { useAppSelector } from "@/redux/store";
import * as ImagePicker from "expo-image-picker";
import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableOpacity, View, Animated } from "react-native";
import ScrollView = Animated.ScrollView;
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadingOverlay from "@/components/LoadingOverlay";
import FormField from "@/components/FormField";
import buttonStyles from "@/styles/buttonStyles";

const CreateCategoryScreen = () => {
    const router = useRouter();
    const token = useAppSelector((state) => state.user.token);

    const [form, setForm] = useState({ name: "", description: "" });
    const [image, setImage] = useState<string | null>(null);

    const [createCategory, { isLoading }] = useCreateCategoryMutation();

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
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
    };

    const handleCategoryCreate = async () => {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);

        if (image) {
            const uriParts = image.split(".");
            const fileType = uriParts[uriParts.length - 1];
            formData.append("image", {
                uri: image,
                name: `category_image.${fileType}`,
                type: `image/${fileType}`,
            } as any);
        }

        try {
            const response = await createCategory([formData, token]).unwrap();
            console.log("Category: ", response);
            Alert.alert("Success", "Category created successfully!", [], { cancelable: true });
            setForm({ name: "", description: "" });
            setImage(null);
            router.replace("/categories");
        } catch (err: any) {
            console.error("Error creating category:", err);
            const errorMessage =
                err?.data?.error || err?.error || "An error occurred while creating the category.";
            Alert.alert("Error", errorMessage, [{ text: "OK" }], { cancelable: true });
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingHorizontal: 20,
                            paddingTop: 20,
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <LoadingOverlay visible={isLoading} />
                        <View
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 20,
                                marginBottom: 30,
                                minHeight: Dimensions.get("window").height - 100,
                            }}
                        >
                            <Text style={{ fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 20 }}>Create Category</Text>

                            <FormField
                                title="Category Name"
                                value={form.name}
                                placeholder="Enter category name..."
                                handleChangeText={(value: string) => handleChange("name", value)}
                            />
                            <FormField
                                title="Description"
                                value={form.description}
                                placeholder="Enter category description..."
                                handleChangeText={(value: string) => handleChange("description", value)}
                            />

                            <TouchableOpacity onPress={pickImage} style={buttonStyles.uploadBtn}>
                                <Text style={[buttonStyles.uploadTextBtn, { textAlign: "center", fontSize: 16 }]}>
                                    Upload Category Image
                                </Text>
                            </TouchableOpacity>

                            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 10 }} />}

                            <TouchableOpacity onPress={handleCategoryCreate} style={buttonStyles.mainBtn}>
                                <Text style={buttonStyles.mainTextBtn}>Create Category</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => router.replace("/categories")}
                                style={buttonStyles.secBtn}
                            >
                                <Text style={buttonStyles.secTextBtn}>Back to Categories</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default CreateCategoryScreen;
