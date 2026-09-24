import { useState, useMemo } from 'react';
import {Text, View, TextInput, FlatList} from 'react-native'
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context"
import {styled} from "nativewind";
import { useSubscriptions } from '@/lib/SubscriptionContext';
import SubscriptionCard from '@/components/SubscriptionCard';

const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
    const { subscriptions } = useSubscriptions();
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredSubscriptions = useMemo(() => {
        return subscriptions.filter(sub => 
            sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, subscriptions]);

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text className="text-2xl font-sans-bold text-primary mb-5">Subscriptions</Text>
            <TextInput
                className="auth-input mb-5"
                placeholder="Search subscriptions..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredSubscriptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="mb-4">
                        <SubscriptionCard
                            {...item}
                            expanded={expandedId === item.id}
                            onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        />
                    </View>
                )}
                ListEmptyComponent={<Text>No subscriptions found</Text>}
                contentContainerClassName="pb-30"
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
            />
        </SafeAreaView>
    )
}

export default Subscriptions