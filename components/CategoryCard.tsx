import { ICategory } from "@/interfaces/category";
import { BASE_URL } from "@/constants/Urls";
import { Image, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";

interface CategoryCardProps {
    category: ICategory;
    token: string | null;
    onDelete: (categoryId: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, token, onDelete }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);
    const handleDropdownDelete = () => {
        try {
            setDropdownVisible(false);
            onDelete(category.id);
        } catch (err: any) {
            console.error("Full RTK Delete Category Error:", err);
            const errorMessage =
                err?.data?.error
                || err?.error
                || "An error occurred during deleting category";

            Alert.alert(
                "Error",
                errorMessage,
                [],
                { cancelable: true }
            );
        }
    };
    const handleDropdownEdit = () => {
        setDropdownVisible(false);
    };

    return (
        <View className={`flex flex-1 p-2 items-center`} style={styles.card}>
            <Image
                source={{ uri: `${BASE_URL}/uploads/200_${category.imageUrl}` }}
                alt={category.name}
                className="w-24 h-24 mb-2"
            />
            <Text className="text-lg font-semibold text-white" style={styles.title}>
                {category.name}
            </Text>

            <TouchableOpacity
                style={styles.dotsButton}
                onPress={toggleDropdown}
            >
                <MaterialIcons name="more-vert" size={12} color="white" />
            </TouchableOpacity>

            {isDropdownVisible && (
                <View style={styles.dropdown}>
                    <TouchableOpacity
                        style={styles.dropdownOption}
                        onPress={handleDropdownEdit}
                    >
                        <Text style={styles.dropdownText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.dropdownOption,
                            { borderBottomWidth: 0 }
                        ]}
                        onPress={handleDropdownDelete}
                    >
                        <Text style={styles.dropdownText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "white",
        position: "relative",
    },
    title: {
        borderStyle: "solid",
        borderTopWidth: 1,
        borderColor: "white",
    },
    dotsButton: {
        width: 23,
        height: 23,
        position: "absolute",
        bottom: 10,
        right: 10,
        padding: 0,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    dropdown: {
        position: "absolute",
        bottom: -75,
        right: 10,
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "white",
        width: 120,
        zIndex: 100,
    },
    dropdownOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "white",
    },
    dropdownText: {
        color: "white",
        textAlign: "center",
    },
});

export default CategoryCard;
