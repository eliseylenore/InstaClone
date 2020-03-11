import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} InstaClone | Insta icon from
      <a href="http://icons8.com">icons8.com</a>
    </footer>
  );
}

export default Footer;
