import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import  {SafeAreaProvider} from "react-native-safe-area-context";



export default  function  RootLayout()  {

    return(
        <SafeAreaProvider>
            <StatusBar style="dark"/>
            <Stack
                screenOptions={{
                    headerStyle: {backgroundColor: '#f8fafc'},
                    headerTintColor: '#0f172a',
                    headerTitleStyle: {fontWeight: 700},

                }}
            />
        </SafeAreaProvider>
    )

}