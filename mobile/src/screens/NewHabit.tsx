import { ScrollView, View } from "react-native";
import { BackButton } from "../assets/components/BackButton";

export function NewHabit() {
    return (
        <View
            className="flex-1 bg-background px-8 pt-16 ">
            {/* rolagem */}
            <ScrollView showsVerticalScrollIndicator={false}>

                <BackButton />
            </ScrollView>
        </View>
    )
}