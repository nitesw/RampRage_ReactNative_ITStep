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
    }
})

export default buttonStyles;