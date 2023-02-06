import React from "react";

function Footer() {
  return (
    <div className="bg-dark text-white mt-5 p-4 text-center">
      copyright &copy; {new Date().getFullYear()} DevConnector
    </div>
  );
}

export default Footer;
