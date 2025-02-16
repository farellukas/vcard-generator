import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="container mx-auto max-w-2xl px-8 py-8 space-y-4">
      <Navbar />
      <MainSection />
    </main>
  );
}

export default App;
