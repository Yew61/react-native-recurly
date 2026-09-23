import "@/global.css"
import {Text, View, Image, FlatList} from "react-native";
import {Link} from "expo-router";
import images from '@/constants/images'
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context"
import {styled} from "nativewind";
import {HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS} from "@/constants/data";
import {icons} from "@/constants/icons";
import {formatCurrency} from "@/lib/utils";
import dayjs, {Dayjs} from "dayjs";
import ListHeading from "@/components/ListHeading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import {useState} from "react";
import {useUser} from "@clerk/expo";
import {posthog} from "@/lib/posthog";
import {posthogAppLogger} from "@/lib/posthogLogs";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
    const { user } = useUser();

    // Get user display name: firstName, fullName, or email
    const displayName = user?.firstName || user?.fullName || user?.emailAddresses[0]?.emailAddress || 'User';

    const onSubscriptionPress = (subscriptionId: string) => {
        const isExpanded = expandedSubscriptionId === subscriptionId;
        posthog?.capture('subscription_details_toggled', {
            is_expanded: !isExpanded,
        });
        posthogAppLogger.info('subscription_details_toggled', {
            is_expanded: !isExpanded,
        });
        setExpandedSubscriptionId(isExpanded ? null : subscriptionId);
    };

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
                <FlatList
                    ListHeaderComponent={() =>(
                        <>
                            <View className='home-header'>
                                <View className="home-user">
                                    <Image
                                        source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar}
                                        className="home-avatar"
                                    />
                                    <Text className="home-user-name">{displayName}</Text>
                                </View>

                                <Image className="home-add-icon" source={icons.add} />
                            </View>

                            <View className="home-balance-card">
                                <Text className="home-balance-label">Balance</Text>

                                <View className="home-balance-row">
                                    <Text className="home-balance-amount">
                                        {formatCurrency(HOME_BALANCE.amount)}
                                    </Text>
                                    <Text className="home-balance-date">
                                        {dayjs(HOME_BALANCE.nextRenewalDate).format("DD/MM")}
                                    </Text>
                                </View>
                            </View>

                            <View className='mb-5'>
                                <ListHeading title="Upcoming"/>
                                <FlatList
                                    data={UPCOMING_SUBSCRIPTIONS}
                                    renderItem = {({item}) => (
                                        <UpcomingSubscriptionCard {...item}/>
                                    )}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    ListEmptyComponent={<Text className="home-empty-state">No upcoming subscriptions</Text>}
                                />
                            </View>

                            <ListHeading title="All Subscriptions"/>
                        </>
                    )}
                    data={HOME_SUBSCRIPTIONS}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <SubscriptionCard
                            {...item}
                            expanded={expandedSubscriptionId === item.id}
                            onPress={() => onSubscriptionPress(item.id)}
                        />
                    )}
                    extraData={expandedSubscriptionId}
                    ItemSeparatorComponent={() => <View className="h-4"/>}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text className="home-empty-state">No subscriptions yet</Text>}
                    contentContainerClassName="pb-30"
                />
        </SafeAreaView>
    );
}