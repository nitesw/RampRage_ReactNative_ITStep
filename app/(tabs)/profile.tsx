import {useAppDispatch, useAppSelector} from "@/redux/store";
import {useRouter} from "expo-router";
import {logOut} from "@/redux/user/userSlice";
import {removeValueFromSecureStore} from "@/utils/secureStore";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import AppLogo from "@/components/AppLogo";
import buttonStyles from "@/styles/buttonStyles";

const ProfileScreen = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const user = useAppSelector((state) => state.user.user);

    const handleLogOut = async () => {
        await removeValueFromSecureStore('access-token');
        dispatch(logOut());
        router.replace("/login");
    }

    return (
        <View style={styles.container}>
            <AppLogo />

            <Text style={styles.title}>User info:</Text>
            {user ? (
                <>
                    <Text className={"text-white"}>Username: {user.username}</Text>
                    <Text className={"text-white"}>Email: {user.email}</Text>
                    <Text className={"text-white"}>Role: {user.role}</Text>

                    <TouchableOpacity
                        onPress={handleLogOut}
                        style={buttonStyles.mainBtn}
                    >
                        <Text className={"text-center text-lg font-bold"} style={buttonStyles.mainTextBtn}>Logout</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text className={"text-white"}>Loading user data...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: "center", padding: 20},
    title: {fontSize: 20, marginBottom: 15, fontWeight: "bold", color: 'white'},
});

export default ProfileScreen;