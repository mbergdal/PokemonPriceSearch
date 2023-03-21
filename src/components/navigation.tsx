import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="bg-teal-600">
            <div className="px-4 py-2 flex flex-row gap-x-3 text-white">
                <Link href={"/"}>Home</Link>
                <Link href={"/search"}>Search</Link>
            </div>
        </nav>
    )
}