"use client";
import { ChevronDown } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-bunga-navy relative overflow-hidden">
      {/* Background Gradient Blur Effect */}
      <div 
        className="absolute -top-64 left-0 w-[692px] h-[692px] rounded-full opacity-49 blur-[200px]"
        style={{
          background: 'rgba(30, 112, 157, 0.49)',
        }}
      />
      
      {/* Navigation */}
      <nav className="relative z-10 w-full h-[140px] backdrop-blur-[5px]" 
           style={{
             background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%)'
           }}>
        <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 xl:px-[172px]">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* Decorative Icon */}
            <div className="w-12 h-12 flex items-center justify-center">
              <svg width="95" height="64" viewBox="0 0 95 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M95.6549 37.0368C93.129 37.2691 90.9158 38.198 89.4573 39.6455C88.7926 40.3035 88.339 40.9615 87.9676 41.8168C87.643 42.5522 87.5062 43.036 87.1308 44.7351C86.9431 45.5789 86.8415 45.9234 86.5638 46.651C85.9343 48.2998 84.9802 50.1267 83.944 51.6826C82.3409 54.0823 80.5539 55.8859 78.5089 57.1747C77.7895 57.6276 76.5382 58.2081 75.764 58.452C74.6027 58.8119 73.8324 58.928 72.1667 58.9977C70.7864 59.0558 70.239 59.0945 69.4374 59.1951C64.3034 59.8299 61.4138 61.8735 60.3112 65.6549C60.0922 66.4057 60.0296 66.7928 60.0062 67.5398C59.9592 68.906 60.1899 70.1678 60.7491 71.5766C61.277 72.9158 62.0394 74.1157 62.927 74.9942C64.319 76.3799 65.9965 77.181 68.2253 77.5255C68.7023 77.5991 68.9369 77.6107 70.0239 77.6107C71.3612 77.6145 71.7835 77.5797 72.8901 77.3784C73.7308 77.2236 75.373 76.794 75.9009 76.585C77.4923 75.958 79.0016 74.7465 80.1317 73.1829C81.1561 71.7663 81.8912 70.1291 82.4582 67.9965C82.7593 66.8586 82.9939 66.2587 83.4983 65.3452C84.9138 62.7675 87.5179 60.3601 91.1661 58.2507C92.9217 57.2367 95.4907 56.0291 96.3744 55.8046C97.2698 55.5801 98.3334 55.642 99.174 55.9672C99.7957 56.2071 101.336 56.9115 102.146 57.3218C106.33 59.4544 109.364 61.9315 111.123 64.6524C111.464 65.1827 112.007 66.2587 112.21 66.8005C112.285 67.0018 112.437 67.5049 112.547 67.9113C112.914 69.3047 113.262 70.2646 113.759 71.267C114.408 72.5791 115.034 73.4886 115.929 74.4137C116.907 75.4277 118.322 76.345 119.452 76.6972C121.055 77.2004 122.451 77.4868 123.827 77.5991C124.613 77.6649 126.138 77.6223 126.827 77.5178C129.732 77.0843 131.886 75.7258 133.368 73.3958C133.493 73.2022 133.72 72.7842 133.877 72.4668C134.678 70.8258 135.03 69.386 135.03 67.7681C135.03 67.0869 134.96 66.5644 134.776 65.8716C134.361 64.3273 133.677 63.1004 132.645 62.0747C131.096 60.5381 128.856 59.6092 125.724 59.2145C124.805 59.0945 124.316 59.0596 122.858 58.9977C121.192 58.928 120.531 58.8313 119.401 58.4907C117.56 57.9411 115.612 56.7529 113.97 55.1737C111.729 53.0256 109.622 49.7396 108.41 46.5155C108.144 45.8072 108.089 45.606 107.835 44.4642C107.471 42.8115 107.186 41.9523 106.736 41.155C105.704 39.3243 103.78 37.9851 101.305 37.3697C100.683 37.2149 99.9522 37.0949 99.2913 37.033C98.7596 36.9865 96.1906 36.9904 95.6549 37.0368Z" fill="#F1F1F1"/>
                <path d="M95.6353 63.2397C94.5718 63.3326 93.4105 63.5997 92.4016 63.9867C90.6225 64.6679 89.1406 65.8677 88.3234 67.2921C87.8542 68.1165 87.5804 68.9254 87.2129 70.5703C86.9275 71.836 86.8492 72.1146 86.5286 72.9468C85.7388 74.9904 84.468 77.2701 83.1307 79.0272C82.4699 79.8942 82.0124 80.4167 81.246 81.1792C79.7093 82.7042 78.1922 83.7221 76.4326 84.4072C75.068 84.9335 73.9692 85.1464 72.2918 85.2006C69.8988 85.2741 68.2448 85.4909 66.6768 85.9321C65.8518 86.1643 65.4021 86.3346 64.667 86.6907C62.4265 87.7744 61.015 89.4465 60.3033 91.8655C60.0922 92.5854 60.0335 92.9647 60.0061 93.7349C59.967 94.9657 60.1117 95.9256 60.5262 97.168C61.273 99.4129 62.6142 101.232 64.3386 102.343C65.0111 102.772 65.8831 103.163 66.6847 103.392C69.062 104.069 71.7952 103.98 74.8217 103.117C76.0377 102.772 76.6321 102.513 77.4727 101.956C79.8305 100.4 81.5041 97.8221 82.4191 94.3348C82.7358 93.135 82.9117 92.6628 83.381 91.7687C84.8629 88.9278 87.7447 86.3153 91.9168 84.0279C93.4965 83.1609 95.737 82.1507 96.5777 81.9223C97.0234 81.8024 98.001 81.8024 98.4467 81.9223C99.0489 82.0849 100.155 82.5532 101.618 83.2654C105.817 85.309 108.977 87.7706 110.838 90.4373C111.284 91.0759 111.487 91.4243 111.819 92.1093C112.16 92.8176 112.312 93.2395 112.547 94.1258C113.325 97.0635 114.42 99.1148 116.081 100.76C117.004 101.673 118.06 102.37 119.127 102.78C119.55 102.939 120.77 103.291 121.395 103.427C124.453 104.104 127.362 103.937 129.528 102.958C130.565 102.49 131.311 101.975 132.105 101.178C132.832 100.45 133.368 99.6954 133.853 98.7084C134.236 97.9382 134.436 97.4196 134.659 96.6571C134.924 95.7359 135.007 95.136 135.007 94.0446C135.01 93.015 134.971 92.7286 134.713 91.85C134.021 89.4968 132.637 87.8248 130.498 86.7526C128.543 85.7734 126.217 85.3051 122.752 85.2006C121.043 85.1464 119.968 84.9413 118.576 84.3994C116.836 83.726 115.319 82.708 113.778 81.1753C112.762 80.169 112.011 79.2556 111.135 77.9629C110.079 76.4031 109.051 74.4253 108.41 72.7184C108.14 71.9947 108.089 71.8127 107.796 70.4968C107.518 69.2505 107.311 68.5732 107.006 67.892C106.517 66.8199 105.798 65.9374 104.777 65.1633C103.389 64.1106 101.418 63.4139 99.3109 63.2358C98.7556 63.1894 96.1945 63.1933 95.6353 63.2397Z" fill="#F1F1F1"/>
                <path d="M97.0821 90.4799C96.5152 90.5689 96.6129 90.5186 94.1691 92.0706C93.2541 92.6512 92.3782 93.2047 92.2218 93.3014C92.0654 93.3982 91.8425 93.5762 91.7291 93.6962C91.3772 94.0755 91.389 93.9633 91.4007 96.7732L91.4124 99.2116L91.518 99.4129C91.5767 99.5212 91.7174 99.6915 91.8308 99.7883C92.128 100.044 96.1398 102.819 96.4057 102.954C97 103.252 98.0206 103.252 98.6188 102.954C98.7439 102.892 99.4126 102.447 100.112 101.96C100.812 101.476 101.763 100.814 102.224 100.493C103.19 99.8231 103.366 99.676 103.506 99.4051L103.612 99.2116V96.6958V94.18L103.522 93.9981C103.397 93.7504 103.135 93.5066 102.674 93.2201C102.22 92.9376 100.105 91.5984 99.3305 91.103C98.6853 90.6889 98.5523 90.6231 98.2434 90.5457C97.9541 90.4683 97.3558 90.4373 97.0821 90.4799Z" fill="#F1F1F1"/>
              </svg>
            </div>
            
            <div className="font-abhaya text-white text-3xl md:text-4xl lg:text-[48px] font-normal tracking-[0.1em]">
              <span>BUNGA </span>
              <span>RAMPAI</span>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12 xl:space-x-16">
            <a href="/" className="font-abhaya text-white text-2xl lg:text-[30px] font-normal tracking-[0.1em] hover:opacity-80 transition-opacity">
              Home
            </a>
            <a href="/catalogue" className="font-abhaya text-white text-2xl lg:text-[30px] font-normal tracking-[0.1em] opacity-50 hover:opacity-80 transition-opacity">
              Catalogue
            </a>
            <a href="/about" className="font-abhaya text-white text-2xl lg:text-[30px] font-normal tracking-[0.1em] opacity-50 hover:opacity-80 transition-opacity">
              About Us
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8" 
            style={{ minHeight: 'calc(100vh - 140px)' }}>
        
        {/* Welcome Text */}
        <div className="text-center mb-8 lg:mb-12">
          <p className="font-montserrat text-white text-2xl sm:text-3xl lg:text-[36px] font-normal tracking-[-1.8px] mb-8 lg:mb-12">
            Welcome to Bunga Rampai
          </p>
          
          {/* Main Headline */}
          <h1 className="font-montserrat text-center font-bold text-4xl sm:text-5xl lg:text-[64px] leading-[1.4] tracking-[6.4px] max-w-4xl mx-auto">
            <span className="text-white">EXPLORING FACTS,</span>
            <br />
            <span className="text-bunga-gold">BUILDING THE FUTURE</span>
          </h1>
        </div>
        
        {/* Call to Action */}
        <div className="flex flex-col items-center mt-12 lg:mt-20 xl:mt-32">
          <p className="font-montserrat text-white text-xl sm:text-2xl lg:text-[24px] font-normal mb-6 lg:mb-8">
            Get to Know Us More
          </p>
          
          {/* Expand Circle Down Button */}
          <button 
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center group"
            onClick={() => {
              // Scroll to next section or handle click
              window.scrollTo({ 
                top: window.innerHeight, 
                behavior: 'smooth' 
              });
            }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
