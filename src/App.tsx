import { AppContextProvider } from "./core/State";
import AppView from "./AppView";
function App() {
  return (
    <AppContextProvider>
      <AppView />
    </AppContextProvider>
  );
}
export default App;
