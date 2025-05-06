import {Image, View} from "react-native";
import images from "@/constants/Images";

const AppLogo = () => {
    return (
        <View className="flex flex-row items-center justify-center">
            <Image source={images.logo} className={"w-[300px]"} resizeMode={"contain"} />
        </View>
    )
}

export default AppLogo;