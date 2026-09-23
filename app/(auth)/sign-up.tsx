import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSignUp } from '@clerk/expo';

const SignUp = () => {
    const { signUp, errors, fetchStatus } = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [hasSentCode, setHasSentCode] = useState(false);

    const resetDone = useRef(false);

    useEffect(() => {
        if (signUp && signUp.status === 'missing_requirements' && !resetDone.current) {
            resetDone.current = true;
            signUp.reset();
            setHasSentCode(false);
        }
    }, [signUp]);

    const onSignUpPress = async () => {
        if (!signUp) return;
        setError('');

        const { error } = await signUp.password({
            emailAddress,
            password,
        });

        if (error) {
            setError(error.message || 'An error occurred');
        } else {
            await signUp.verifications.sendEmailCode();
            setHasSentCode(true);
        }
    };

    const onPressVerify = async () => {
        if (!signUp) return;
        setError('');

        const { error } = await signUp.verifications.verifyEmailCode({
            code,
        });

        if (error) {
            setError(error.message || 'An error occurred');
        } else if (signUp.status === 'complete') {
            await signUp.finalize({
                navigate: () => router.replace('/(tabs)'),
            });
        }
    };

    const onPressBack = async () => {
        if (!signUp) return;
        setError('');
        setHasSentCode(false);
        await signUp.reset();
    };

    const pendingVerification = hasSentCode && signUp?.status === 'missing_requirements' && signUp.unverifiedFields.includes('email_address');

    return (
        <View className="auth-screen">
            <View className="auth-content">
                <View className="auth-brand-block">
                    <Text className="auth-title">{pendingVerification ? 'Verify your email' : 'Create an account'}</Text>
                    <Text className="auth-subtitle">
                        {pendingVerification ? 'Enter the code sent to your email' : 'Sign up to start managing your subscriptions'}
                    </Text>
                </View>

                {/* Captcha mount point */}
                <View nativeID="clerk-captcha" />

                <View className="auth-card">
                    <View className="auth-form">
                        {!pendingVerification ? (
                            <>
                                <View className="auth-field">
                                    <Text className="auth-label">Email</Text>
                                    <TextInput
                                        className={`auth-input ${error || errors?.fields?.emailAddress ? 'auth-input-error' : ''}`}
                                        autoCapitalize="none"
                                        value={emailAddress}
                                        placeholder="Enter your email"
                                        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                                    />
                                    {errors?.fields?.emailAddress?.[0]?.message && <Text className="auth-error">{errors.fields.emailAddress[0].message}</Text>}
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
                                    {errors?.fields?.password?.[0]?.message && <Text className="auth-error">{errors.fields.password[0].message}</Text>}
                                </View>
                                {error ? <Text className="auth-error">{error}</Text> : null}
                                <Pressable className="auth-button" onPress={onSignUpPress} disabled={fetchStatus === 'fetching'}>
                                    {fetchStatus === 'fetching' ? <ActivityIndicator color="white" /> : <Text className="auth-button-text">Sign up</Text>}
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <View className="auth-field">
                                    <Text className="auth-label">Verification Code</Text>
                                    <TextInput
                                        className={`auth-input ${error || errors?.fields?.code ? 'auth-input-error' : ''}`}
                                        value={code}
                                        placeholder="Enter your code"
                                        onChangeText={(code) => setCode(code)}
                                    />
                                    {errors?.fields?.code?.[0]?.message && <Text className="auth-error">{errors.fields.code[0].message}</Text>}
                                </View>
                                {error ? <Text className="auth-error">{error}</Text> : null}
                                <Pressable className="auth-button" onPress={onPressVerify} disabled={fetchStatus === 'fetching'}>
                                    {fetchStatus === 'fetching' ? <ActivityIndicator color="white" /> : <Text className="auth-button-text">Verify</Text>}
                                </Pressable>
                                <Pressable onPress={onPressBack} className="mt-4">
                                    <Text className="auth-link text-center">Back</Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>

                {!pendingVerification && (
                    <View className="auth-link-row">
                        <Text className="auth-link-copy">Already have an account?</Text>
                        <Link href="/(auth)/sign-in" className="auth-link">Sign in</Link>
                    </View>
                )}
            </View>
        </View>
    );
};

export default SignUp;
