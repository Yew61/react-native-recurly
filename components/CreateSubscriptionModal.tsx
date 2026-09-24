import { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable, ScrollView } from 'react-native';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { icons } from '@/constants/icons';

interface CreateSubscriptionModalProps {
    visible: boolean;
    onClose: () => void;
    onAddSubscription: (subscription: Subscription) => void;
}

const CATEGORIES = ['Entertainment', 'AI Tools', 'Developer Tools', 'Design', 'Productivity', 'Cloud', 'Music', 'Other'];

export default function CreateSubscriptionModal({ visible, onClose, onAddSubscription }: CreateSubscriptionModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [frequency, setFrequency] = useState<'Monthly' | 'Yearly'>('Monthly');
    const [category, setCategory] = useState(CATEGORIES[0]);

    const isFormValid = name.trim() !== '' && parseFloat(price) > 0;

    const handleSubmit = () => {
        if (!isFormValid) return;

        const newSubscription: Subscription = {
            id: Date.now().toString(),
            name: name,
            price: parseFloat(price),
            billing: frequency,
            category: category,
            status: 'active',
            startDate: dayjs().toISOString(),
            renewalDate: frequency === 'Monthly' ? dayjs().add(1, 'month').toISOString() : dayjs().add(1, 'year').toISOString(),
            icon: icons.plus,
            color: '#f5c542', // Default color, maybe map based on category
        };

        onAddSubscription(newSubscription);
        setName('');
        setPrice('');
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View className="modal-overlay">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="modal-container"
                >
                    <View className="modal-header">
                        <Text className="modal-title">New Subscription</Text>
                        <Pressable onPress={onClose} className="modal-close">
                            <Text className="modal-close-text">✕</Text>
                        </Pressable>
                    </View>

                    <ScrollView contentContainerClassName="modal-body">
                        <TextInput
                            className="auth-input"
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            className="auth-input"
                            placeholder="Price"
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="decimal-pad"
                        />

                        <View className="picker-row">
                            <TouchableOpacity
                                className={clsx('picker-option', frequency === 'Monthly' && 'picker-option-active')}
                                onPress={() => setFrequency('Monthly')}
                            >
                                <Text className={clsx('picker-option-text', frequency === 'Monthly' && 'picker-option-text-active')}>Monthly</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={clsx('picker-option', frequency === 'Yearly' && 'picker-option-active')}
                                onPress={() => setFrequency('Yearly')}
                            >
                                <Text className={clsx('picker-option-text', frequency === 'Yearly' && 'picker-option-text-active')}>Yearly</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="category-scroll">
                            {CATEGORIES.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    className={clsx('category-chip', category === cat && 'category-chip-active')}
                                    onPress={() => setCategory(cat)}
                                >
                                    <Text className={clsx('category-chip-text', category === cat && 'category-chip-text-active')}>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            className={clsx('auth-button', !isFormValid && 'auth-button-disabled')}
                            onPress={handleSubmit}
                            disabled={!isFormValid}
                        >
                            <Text className="auth-button-text">Create</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}
