import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
    mainBtn: {
        width: "100%",
        backgroundColor: "#780274",
        padding: 16,
        marginTop: 16,
        borderStyle: "solid",
        /*borderWidth: 1,
        borderColor: "white",*/

        boxShadow: '5 5 0 0 rgba(120, 2, 116, 0.7)'
    },
    secBtn: {
        width: "100%",
        backgroundColor: "#5b0057",
        padding: 16,
        marginTop: 16,
        borderStyle: "solid",
        /*borderWidth: 1,
        borderColor: "white",*/

        boxShadow: '5 5 0 0 rgba(120, 2, 116, 0.5)'
    },
    uploadBtn: {
        width: "100%",
        backgroundColor: "#39a00d",
        padding: 16,
        marginTop: 4,
        marginBottom: 16,
        borderStyle: "solid",

        boxShadow: '5 5 0 0 rgba(83, 237, 17, 0.4)'
    }
})

export default buttonStyles;