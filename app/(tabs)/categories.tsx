import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "@/services/api.category";
import { View, FlatList, StyleSheet, Text, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadingOverlay from "@/components/LoadingOverlay";
import CategoryCard from "@/components/CategoryCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {ICategory} from "@/interfaces/category";

const CategoriesScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const token = useAppSelector((state) => state.user.token);

    const { data: categories, isLoading, error } = useGetCategoriesQuery(token);
    const [deleteCategory, {isLoading: isDeleteLoading}] = useDeleteCategoryMutation();

    const [categoriesList, setCategoriesList] = useState<ICategory[]>([]);


    useEffect(() => {
        if (categories) {
            setCategoriesList(categories);
        }
    }, [categories]);

    const handleDeleteCategory = async (categoryId: number) => {
        const updatedCategories = categoriesList.filter((category) => category.id !== categoryId);

        try {
            await deleteCategory([categoryId, token]).unwrap();
            Alert.alert("Success", "Successfully deleted category!", [], { cancelable: true });
            setCategoriesList(updatedCategories);
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
            setCategoriesList(categories!);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, position: "relative" }}>
                <LoadingOverlay visible={isLoading || isDeleteLoading} />
                <FlatList
                    data={categoriesList}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={
                        <>
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 50,
                                    marginBottom: 20,
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>Categories</Text>
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => router.replace("/createCategory")}
                                >
                                    <MaterialIcons name="add" size={12} color="white" />
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                    contentContainerStyle={{
                        gap: 10,
                        paddingBottom: 200,
                        paddingTop: 20,
                    }}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <View style={{ width: "100%", paddingBottom: 5 }}>
                            <CategoryCard
                                category={item}
                                token={token}
                                onDelete={handleDeleteCategory}
                            />
                        </View>
                    )}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    title: { fontSize: 20, marginBottom: 15, marginTop: 50, textAlign: "center", fontWeight: "bold" },
    container: { flex: 1, justifyContent: "center", padding: 20 },
    addButton: {
        width: 23,
        height: 23,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10
    }
});

export default CategoriesScreen;
