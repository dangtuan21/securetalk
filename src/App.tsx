import { AppContextProvider } from "./State";
import View from "./View";
function App() {
  return (
    <AppContextProvider>
      <View />
    </AppContextProvider>
  );
}
export default App;
