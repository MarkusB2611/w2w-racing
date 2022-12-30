import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const menuItems = [
    { name: "Home", href: "/", active: true },
    { name: "Events", href: "/events", active: false },
    { name: "Drivers", href: "/drivers", active: false },
    { name: "Tracks", href: "/tracks", active: false },
    { name: "Cars", href: "/cars", active: false },
  ];

  return (
    <nav className="flex h-24 items-center justify-center bg-gray-900 align-text-bottom text-xl text-white shadow-md shadow-red-600 sm:justify-between sm:px-24">
      <div className="hidden sm:block">
        <Image src="/w2w.png" alt="Logo" width={100} height={50} />
      </div>
      <ul className=" flex h-full items-center  justify-center gap-8 md:justify-end">
        {menuItems.map((item) => {
          return (
            <li key={item.name} className="hover:text-red-600">
              <Link href={item.href}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
