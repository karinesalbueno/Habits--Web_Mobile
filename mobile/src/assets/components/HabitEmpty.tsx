import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function HabitsEmpty() {

    const { navigate } = useNavigation();

    return (
        <Text className="text-zinc-400 text-base">
            você ainda não adicionou um hábito para este dia {' '}
            <Text className="text-violet-400 text-base underline active:text-violet-500"
                onPress={() => navigate('newhabit')}>
                comece cadastrando um
            </Text>
        </Text>
    )
}