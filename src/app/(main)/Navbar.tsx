import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 bg-card">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 p-3">
        <Link href="/" className="text-3xl font-bold text-primary">
          bugbook
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
};

export default Navbar;
