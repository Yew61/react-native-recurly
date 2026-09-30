import { icons } from "./icons";

export const tabs: AppTab[] = [
    { name: "index", title: "Home", icon: icons.home },
    { name: "tracking", title: "Entries", icon: icons.wallet },
    { name: "statistics", title: "Insights", icon: icons.activity },
    { name: "settings", title: "Settings", icon: icons.setting },
];

export const trackingCards:  TrackingCards[] = [
    {id: 1, name: "Emotions", icon: icons.emotions},
]

export const USER_DATA: userData[] = [
    {
        id: 1,
        wellbeing: 5,
        sleep: 8.5,
        function: 7,
        symptom: 4,
        date: new Date()
    },
    {
        id: 2,
        wellbeing: 9,
        sleep: 8.5,
        function: 7,
        symptom: 4,
        date:  new Date("2026-09-29")
    },
    {
        id: 3,
        wellbeing: 2,
        sleep: 8.5,
        function: 7,
        symptom: 4,
        date: new Date("2026-09-28")
    },
    {
        id: 4,
        wellbeing: 5,
        sleep: 8.5,
        function: 7,
        symptom: 4,
        date: new Date("2026-09-27")
    },
    {
        id: 5,
        wellbeing: 5,
        sleep: 8.5,
        function: 7,
        symptom: 4,
        date: new Date("2026-09-26")
    },
    {
        id: 6,
        wellbeing: 5,
        sleep: 8.5,
        function: 7,
        symptom: 4,
        date: new Date("2026-09-28")
    }
]