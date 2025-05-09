import {StyleSheet, Text, TextInput, TextInputProps, View} from "react-native";
import React from "react";
import {Shadow} from "react-native-shadow-2";

interface FormFieldProps extends TextInputProps {
    title: string;
    value: string;
    placeholder: string;
    handleChangeText: (value: string) => void;
    otherStyles?: string;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 title,
                                                 value,
                                                 placeholder,
                                                 handleChangeText,
                                                 otherStyles = "",
                                                 ...props
                                             }) => {
    return (
        <View className={`w-full mb-4 ${otherStyles}`}>
            <Text className="ml-2 mb-1 text-base text-white font-medium">
                {title}
            </Text>
            <View className="w-full h-14 px-4 shadow-sm flex flex-row items-center"
                  style={styles.input}
            >
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={"#9ca3af"}
                    value={value}
                    onChangeText={handleChangeText}
                    className="flex-1 text-white font-medium text-base"
                    {...props}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        // backgroundColor: "#212220",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "white",

        // boxShadow: '5 5 0 0 rgba(83, 237, 17, 0.4)'
        /*borderBottomColor: "#780274",
        borderRightColor: "#53ed11",*/
    },
    inputText: {
        color: "white",
    }
});

export default FormField;