import Feed from "./components/Feed";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto py-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Fake Instagram Feed
        </h1>
        <Feed />
      </div>
    </div>
  );
}