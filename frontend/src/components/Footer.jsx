import React from "react";

const Footer = () => {
  return (
    <footer className="py-2 px-10 flex justify-between flex-wrap items-center bg-[#1a1d23] text-[#c7c7d2] mb-0 mt-3 font-bold">
      <h2 className="m-2 text-3xl">
        FixCodeAI <span className="text-[#b56c6c]">&lt;/&gt;</span>
      </h2>
      <div className="my-4">
        Created By: <a href="https://github.com/hamna663/">Hamna Tariq</a>
      </div>
      <div>
        <a
          className="rounded-full px-2 py-1 gap-1 flex text-lg items-center bg-white text-[#323741] border-1 hover:border-white cursor-pointer"
          href="https://github.com/hamna663/FixCodeAI.git"
          target="_blank"
        >
          <img src="./github.svg" className="w-7" alt="github-icon" />
          GitHub
        </a>
      </div>
    </footer>
  );
};
export default Footer;
