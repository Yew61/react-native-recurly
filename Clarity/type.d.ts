import type { ImageSourcePropType } from "react-native";

declare global {
    interface AppTab {
        name: string;
        title: string;
        icon: ImageSourcePropType;
    }

    interface TabIconProps {
        focused: boolean;
        icon: ImageSourcePropType;
    }

    interface TrackingCards {
        id: number;
        name: string;
        icon: ImageSourcePropType;
    }

    interface Subscription {
        id: string;
        icon: ImageSourcePropType;
        name: string;
        plan?: string;
        category?: string;
        paymentMethod?: string;
        status?: string;
        startDate?: string;
        price: number;
        currency?: string;
        billing: string;
        renewalDate?: string;
        color?: string;
    }

    interface SubscriptionCardProps extends Omit<Subscription, "id"> {
        expanded: boolean;
        onPress: () => void;
        onCancelPress?: () => void;
        isCancelling?: boolean;
    }

    interface UpcomingSubscription {
        id: string;
        icon: ImageSourcePropType;
        name: string;
        price: number;
        currency?: string;
        daysLeft: number;
    }

    interface userData {
        id:number;
        wellbeing: number;
        sleep: number;
        function: number;
        symptom: number;
        date: Date;
    }

    // interface userData {
    //     wellbeing: number;
    //     anxiety: number;
    //     depression: number;
    //     irritability: number;
    //     stress: number;
    //     overallMood: number;
    //     hallucinationsFrequency: number;
    //     type: string;
    //     hallucinationsThemes: string[];
    //     distress: number;
    //     delusionalThinking: number;
    //     psychoticBeliefs: number
    //     intrusiveThoughtsFrequency: number;
    //     cause: string[];
    //     intrusiveThoughtsThemes: string[];
    //     medications: string[];
    //     sideEffects: string[];
    //     lifeInterference: number;
    //     motivation: number;
    //     pleasure: number;
    //     socialInteraction: number;
    //     sleep: number;
    //     exercise: number;
    //     hobbies: string[];
    //     appetite: number;
    //     weight: number;
    //     energy: number;
    //     customMeasurement;
    // }

    interface UpcomingSubscriptionCardProps
        extends Omit<UpcomingSubscription, "id"> {}

    interface ListHeadingProps {
        title: string;
    }
}

export {};