import { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSignIn } from '@clerk/expo';
import { ClerkError } from '@clerk/types';

const SignIn = () => {
    const { signIn, errors, fetchStatus } = useSignIn();
    const router = useRouter();
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [secondFactorCode, setSecondFactorCode] = useState('');
    const [showSecondFactor, setShowSecondFactor] = useState(false);

    const onSignInPress = async () => {
        if (!signIn) return;
        setError('');

        const { error } = await signIn.password({
            emailAddress,
            password,
        });

        if (error) {
            setError(error.message || 'An error occurred');
        } else if (signIn.status === 'needs_second_factor') {
            setShowSecondFactor(true);
        } else if (signIn.status === 'complete') {
            await signIn.finalize({
                navigate: () => router.replace('/(tabs)'),
            });
        }
    };

    const onSecondFactorPress = async () => {
        if (!signIn) return;
        setError('');

        try {
            const result = await signIn.attemptSecondFactor({
                code: secondFactorCode,
            });

            if (result.status === 'complete') {
                await signIn.finalize({
                    navigate: () => router.replace('/(tabs)'),
                });
            } else {
                setError('Second factor verification failed');
            }
        } catch (err: any) {
            setError(err.errors?.[0]?.message || 'An error occurred during verification');
        }
    };

    return (
        <View className="auth-screen">
            <View className="auth-content">
                <View className="auth-brand-block">
                    <View className="auth-logo-wrap">
                        <View className="auth-logo-mark"><Text className="auth-logo-mark-text">R</Text></View>
                        <View>
                            <Text className="auth-wordmark">Recurly</Text>
                            <Text className="auth-wordmark-sub">SMART BILLING</Text>
                        </View>
                    </View>
                    <Text className="auth-title">Welcome back</Text>
                    <Text className="auth-subtitle">Sign in to continue managing your subscriptions</Text>
                </View>

                <View className="auth-card">
                    <View className="auth-form">
                        {!showSecondFactor ? (
                            <>
                                <View className="auth-field">
                                    <Text className="auth-label">Email</Text>
                                    <TextInput
                                        className={`auth-input ${error || errors?.fields?.identifier ? 'auth-input-error' : ''}`}
                                        autoCapitalize="none"
                                        value={emailAddress}
                                        placeholder="Enter your email"
                                        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                                    />
                                    {errors?.fields?.identifier && <Text className="auth-error">{errors.fields.identifier[0].message}</Text>}
                                </View>

                                <View className="auth-field">
                                    <Text className="auth-label">Password</Text>
                                    <TextInput
                                        className={`auth-input ${error || errors?.fields?.password ? 'auth-input-error' : ''}`}
                                        value={password}
                                        placeholder="Enter your password"
                                        secureTextEntry={true}
                                        onChangeText={(password) => setPassword(password)}
                                    />
                                    {errors?.fields?.password && <Text className="auth-error">{errors.fields.password[0].message}</Text>}
                                </View>

                                {error ? <Text className="auth-error">{error}</Text> : null}

                                <Pressable className="auth-button" onPress={onSignInPress} disabled={fetchStatus === 'fetching'}>
                                    {fetchStatus === 'fetching' ? <ActivityIndicator color="white" /> : <Text className="auth-button-text">Sign in</Text>}
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <View className="auth-field">
                                    <Text className="auth-label">Verification Code</Text>
                                    <TextInput
                                        className={`auth-input ${error ? 'auth-input-error' : ''}`}
                                        value={secondFactorCode}
                                        placeholder="Enter your verification code"
                                        onChangeText={(code) => setSecondFactorCode(code)}
                                    />
                                </View>

                                {error ? <Text className="auth-error">{error}</Text> : null}

                                <Pressable className="auth-button" onPress={onSecondFactorPress} disabled={fetchStatus === 'fetching'}>
                                    {fetchStatus === 'fetching' ? <ActivityIndicator color="white" /> : <Text className="auth-button-text">Verify</Text>}
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>

                <View className="auth-link-row">
                    <Text className="auth-link-copy">New to Recurly?</Text>
                    <Link href="/(auth)/sign-up" className="auth-link">Create an account</Link>
                </View>
            </View>
        </View>
    );
};

export default SignIn;