import Image from "next/image"

const SiteHeader = () => {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="#home" className="flex items-center space-x-2">
                <Image
                  src="/placeholder-logo.svg"
                  alt="Guantanamera Logo"
                  width={40}
                  height={40}
                  className="h-8 w-8 md:h-10 md:w-10"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-black md:text-2xl">Guantanamera</span>
                  <span className="text-xs text-gray-600 font-medium hidden sm:block">23 años a su servicio</span>
                </div>
              </a>
            </div>\
            {/* /** rest of code here **/ */}
 {10}</div>\
          {/* /** rest of code here **/ */}
 {8}</div>
      </nav>
    </header>
  );
};

export default SiteHeader;\
