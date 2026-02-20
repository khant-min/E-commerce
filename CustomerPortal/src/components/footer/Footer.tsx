// export default function Footer() {
//   const date = new Date().getFullYear();
//   return (
//     <div className="flex justify-end m-4 mt-20">
//       <h4>&#169;{date} E-commerce. All Rights Reserved.</h4>
//     </div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { footerLinks } from "../../constants";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="py-10">
      {/* <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <motion.div
          className="text-center md:text-left mb-4 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-blue-500">Connect with Me</h2>
          <p className="">Let's get in touch!</p>
        </motion.div>
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="https://github.com/khant-min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="hover:text-blue-900 text-2xl transition-colors duration-200" />
          </a>
          <a
            href="https://linkedin.com/in/khant-min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="hover:text-blue-500 text-2xl transition-colors duration-200" />
          </a>
          <a href="mailto:kmin01405@gmail.com">
            <FaEnvelope className="hover:text-blue-500 text-2xl transition-colors duration-200" />
          </a>
          <a href="tel:+76780503">
            <FaPhone className="hover:text-blue-500 text-2xl transition-colors duration-200" />
          </a>
        </motion.div>
      </div> */}
      <div className="grid place-items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-32">
          {footerLinks.map((link) => (
            <div
              key={link.title}
              className="flex flex-col gap-6 text-base min-w-[170px]"
            >
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link key={item.title} to={item.url} className="text-gray-500">
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-8 text-center text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        &copy; {new Date().getFullYear()} K8ros. All Rights Reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
