export default function MobileWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-gray-200 flex justify-center">
      <div className="relative bg-white w-[390px] min-h-screen shadow-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
