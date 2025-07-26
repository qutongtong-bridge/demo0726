import { TamaguiProvider } from '@tamagui/core';
import { ChargingScreen } from './ChargingScreen';
import { IPhoneWrapper } from './components/IPhoneWrapper';
import appConfig from './tamagui.config';

function App() {
  return (
    <TamaguiProvider config={appConfig}>
      <IPhoneWrapper model="iPhone14Pro">
        <ChargingScreen />
      </IPhoneWrapper>
    </TamaguiProvider>
  );
}

export default App;
