import Link from "next/link";

export default function NotFound() {
  return (
    <div className="overflow-hidden text-black md:py-15">
      <div className="container relative mx-auto">
        <div className="grid grid-cols-1 items-center py-15 xl:py-10">
          <div>
            <h2 className="relative z-10 text-center text-6xl font-bold xl:text-9xl">
              Oops! <br /> Page Not Found
            </h2>
            <span className="absolute left-0 top-0 w-full transform whitespace-nowrap text-[250px] font-extrabold text-gray-400 opacity-40 blur-[2px] md:-left-[5%] xl:text-[300px]">
              ERROR 404
            </span>
            <p className="mx-auto text-center text-base md:p-4 xl:w-2/3 xl:text-xl">
              Don&apos;t worry, though! You can back to
              <Link href="/">Main Page</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
