import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import useCachedResources from '@/hooks/useCachedResources';
import Navigation from '@/navigation';
import store, { persistor } from '@/store';

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <StoreProvider store={store}>
                <PersistGate persistor={persistor}>
                    <SafeAreaProvider>
                        <Navigation />
                        <StatusBar />
                    </SafeAreaProvider>
                </PersistGate>
            </StoreProvider>
        );
    }
}
