import {StyleSheet} from 'react-native';

const buttonStyles = StyleSheet.create({
    mainBtn: {
        width: "100%",
        backgroundColor: "white",
        padding: 16,
        marginTop: 16,
        borderStyle: "solid",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "transparent",

        // boxShadow: '5 5 0 0 rgba(120, 2, 116, 0.7)'
    },
    secBtn: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: 16,
        marginTop: 16,
        borderStyle: "solid",
        alignItems: "center",
        borderWidth: 1,
        // borderColor: "white",

        // boxShadow: '5 5 0 0 rgba(120, 2, 116, 0.5)'
    },
    uploadBtn: {
        width: "100%",
        // backgroundColor: "white",
        padding: 16,
        marginTop: 4,
        marginBottom: 16,
        borderStyle: "solid",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
    },
    dangerBtn: {
        width: "100%",
        backgroundColor: "#FF9999",
        padding: 16,
        marginTop: 16,
        borderStyle: "solid",
        alignItems: "center",
    },
    mainTextBtn: {
        borderBottomWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        color: "black",
        fontWeight: "bold",
    },
    secTextBtn: {
        color: "black",
    },
    uploadTextBtn: {
        borderBottomWidth: 1,
        borderColor: "white",
        borderStyle: "solid",
        color: "white",
    },
    dangerTextBtn: {
        borderBottomWidth: 1,
        borderColor: "white",
        borderStyle: "solid",
        color: "white",
        fontWeight: "bold",
    }
})

export default buttonStyles;