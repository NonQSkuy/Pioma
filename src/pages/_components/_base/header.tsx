import logo from "@/assets/logo.png";
import { menu } from "../../../core/utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, BadgeAnchor } from "@heroui/react";
import {
  faBell,
  faCircleUser,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const menuList = menu.filter((item) => item.name !== "Sign Up");
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col items-center w-full fixed top-0 left-0 right-0 z-50">
      {/* Top announcement bar */}
      <div className="w-full h-8 bg-black flex items-center justify-center">
        <span className="text-white text-xs tracking-widest uppercase">
          Free shipping on orders over Rp 200.000 &nbsp;·&nbsp; New arrivals
          every week
        </span>
      </div>

      {/* Main navbar */}
      <div className="flex items-center justify-between w-full bg-white border-b border-gray-100 shadow-sm px-12 py-4 gap-8">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Pioma Logo" width={56} height={56} />
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {menuList.map((item) => {
            const isActive =
              item.link === "/"
                ? pathname === "/"
                : pathname.startsWith(item.link);
            return (
              <Link
                key={item.name}
                to={item.link}
                className={`relative text-sm font-medium tracking-wide transition-colors group ${
                  isActive ? "text-black" : "text-gray-500 hover:text-black"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-black rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Search bar */}
        <div className="flex-1 max-w-sm">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-gray-400 focus-within:bg-white transition-colors">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-400 text-sm shrink-0"
            />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
            />
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-5">
          {[
            { to: "/account", icon: faBell },
            { to: "/account", icon: faHeart },
          ].map(({ to, icon }) => (
            <Link
              key={String(icon)}
              to={to}
              className="text-gray-500 hover:text-black transition-colors"
            >
              <FontAwesomeIcon size="lg" icon={icon} />
            </Link>
          ))}

          {/* Cart with badge */}
          <Link
            to="/cart"
            className="flex items-center text-gray-500 hover:text-black transition-colors"
          >
            <BadgeAnchor className="flex items-center">
              <FontAwesomeIcon size="lg" icon={faCartShopping} />
              <Badge color="danger" size="sm">
                5
              </Badge>
            </BadgeAnchor>
          </Link>

          {/* User avatar button */}
          <Link
            to="/account"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-black"
          >
            <FontAwesomeIcon size="lg" icon={faCircleUser} />
          </Link>
        </div>
      </div>
    </div>
  );
}
