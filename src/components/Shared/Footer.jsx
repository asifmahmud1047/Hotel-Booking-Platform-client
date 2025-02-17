// import { Link } from "react-router-dom";
// import Container from "./Container";
// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Mail,
//   Phone,
//   MapPin,
// } from "lucide-react";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gray-900 text-white pt-16 pb-8">
//       <Container>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* About Section */}
//           <div>
//             <h3 className="text-2xl font-bold mb-4">HotelHaven</h3>
//             <p className="text-gray-400 mb-4">
//               Experience luxury and comfort at its finest. Your perfect stay
//               awaits at HotelHaven.
//             </p>
//             <div className="flex gap-4">
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors"
//                 aria-label="Facebook"
//               >
//                 <Facebook size={20} />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors"
//                 aria-label="Instagram"
//               >
//                 <Instagram size={20} />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors"
//                 aria-label="Twitter"
//               >
//                 <Twitter size={20} />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   to="/rooms"
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   Our Rooms
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/privacy-policy"
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   Privacy Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
//             <ul className="space-y-4">
//               <li className="flex items-center gap-2 text-gray-400">
//                 <MapPin size={20} />
//                 <span>123 Hotel Street, City, Country</span>
//               </li>
//               <li className="flex items-center gap-2 text-gray-400">
//                 <Phone size={20} />
//                 <span>+1 234 567 890</span>
//               </li>
//               <li className="flex items-center gap-2 text-gray-400">
//                 <Mail size={20} />
//                 <span>info@hotelhaven.com</span>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
//             <p className="text-gray-400 mb-4">
//               Subscribe to our newsletter for updates and exclusive offers.
//             </p>
//             <form className="flex flex-col gap-2">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
//           <p>© {currentYear} HotelHaven. All rights reserved.</p>
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;

import { Link } from "react-router-dom";
import Container from "./Container";

const Footer = () => {
  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Hotel Booking</h3>
            <p className="text-gray-300">
              Discover comfort and luxury at its finest.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">123 Hotel Street</li>
              <li className="text-gray-300">City, Country</li>
              <li className="text-gray-300">+1 234 567 890</li>
              <li className="text-gray-300">info@hotelname.com</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-gray-300">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded bg-gray-800 text-white flex-grow"
              />
              <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} Hotel Booking. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;