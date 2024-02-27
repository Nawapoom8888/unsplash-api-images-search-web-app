import React from "react";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { PiSmileySadFill } from "react-icons/pi";

import { useGlobalContext } from "../Context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const imagesPerPage = 12;

const ImageGallery = () => {
  const { searchValue } = useGlobalContext();
  const [pageNumber, setPageNumber] = React.useState(1);

  if (pageNumber < 1) {
    setPageNumber(1);
  }

  React.useEffect(() => {
    setPageNumber(1);
  }, [searchValue]);

  const response = useQuery({
    queryKey: ["images", searchValue, pageNumber],
    queryFn: async () => {
      const result = await axios.get(
        `${url}&query=${searchValue}&page=${pageNumber}&per_page=${imagesPerPage}`,
      );
      return result.data;
    },
  });

  // console.log(response);

  if (response.isLoading) {
    return (
      <div className="border-test mx-auto h-screen max-w-6xl px-10 py-12 text-center sm:px-12 sm:py-16">
        <div className="flex flex-col items-center justify-center gap-5">
          {/* <div class="border-blue-450 border-sol80 border-5-4 h-16 w-16 animate-spin rounded-full"></div> */}
          <div role="status">
            <svg
              aria-hidden="true"
              class="h-12 w-12 animate-spin fill-blue-800 text-gray-300 dark:text-gray-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <h1 className="text-lg text-gray-800 dark:text-gray-200">
            Loading...
          </h1>
        </div>
      </div>
    );
  }
  if (response.isError) {
    return (
      <div className="border-test mx-auto max-w-6xl px-10 py-12 sm:px-12 sm:py-16">
        <div className="flex flex-col items-center justify-center gap-3 ">
          <PiSmileySadFill className="text-5xl text-gray-600 dark:text-gray-300" />
          <h1 className="text-lg text-gray-800 dark:text-gray-200">
            Sorry, There are some errors!
          </h1>
        </div>
      </div>
    );
  }

  const results = response.data.results;
  // const totalPages = response.data.total_pages;
  // console.log(totalPages);

  if (results.length < 1) {
    return (
      <div className="border-test mx-auto max-w-6xl px-10 py-12 sm:px-12 sm:py-16">
        <div className="flex flex-col items-center justify-center gap-3 ">
          <PiSmileySadFill className="text-5xl text-gray-600 dark:text-gray-300" />
          <h1 className="text-lg text-gray-800 dark:text-gray-200">
            Sorry, No Images Found...
          </h1>
        </div>
      </div>
    );
  }

  let count = 0;

  return (
    <div className="">
      <div className="border-test mx-auto max-w-6xl px-10 py-12 sm:px-12 sm:py-16">
        <div className="grid h-[240rem] grid-cols-12 grid-rows-[repeat(11,1fr)] gap-3 min-[560px]:h-[120rem] min-[760px]:h-[70rem] min-[930px]:h-[60rem]">
          {results.map((item) => {
            const url = item?.urls?.regular;
            count = count + 1;
            return (
              <div
                key={item.id}
                className={`${
                  count === 1
                    ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-2 min-[760px]:col-span-4 min-[760px]:row-span-3 min-[930px]:col-span-3 min-[930px]:row-span-4"
                    : count === 2
                      ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-1 min-[760px]:col-span-4 min-[760px]:row-span-2 min-[930px]:col-span-3 min-[930px]:row-span-3"
                      : count === 3
                        ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-2 min-[760px]:col-span-4 min-[760px]:row-span-3 min-[930px]:col-span-3 min-[930px]:row-span-4"
                        : count === 4
                          ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-2 min-[760px]:col-span-4 min-[760px]:row-span-3 min-[930px]:col-span-3 min-[930px]:row-span-3"
                          : count === 5
                            ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-2 min-[760px]:col-span-4 min-[760px]:row-span-3 min-[930px]:col-span-3 min-[930px]:row-span-4"
                            : count === 6
                              ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-2 min-[760px]:col-span-4 min-[760px]:row-span-3 min-[930px]:col-span-3 min-[930px]:row-span-4"
                              : count === 7
                                ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-2 min-[760px]:col-span-4 min-[760px]:row-span-3 min-[930px]:col-span-3 min-[930px]:row-span-4"
                                : count === 8
                                  ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-2 min-[760px]:col-span-4 min-[760px]:row-span-3 min-[930px]:col-span-3 min-[930px]:row-span-4"
                                  : count === 9
                                    ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-2 min-[760px]:col-span-4 min-[760px]:row-span-3 min-[930px]:col-span-3 min-[930px]:row-span-4"
                                    : count === 10
                                      ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-2 min-[760px]:col-span-4 min-[760px]:row-span-3 min-[930px]:col-span-3 min-[930px]:row-span-4"
                                      : count === 11
                                        ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-2 min-[760px]:col-span-4 min-[760px]:row-span-2 min-[930px]:col-span-3 min-[930px]:row-span-3"
                                        : count === 12
                                          ? "col-span-12 row-span-1 min-[560px]:col-span-6 min-[560px]:row-span-1 min-[760px]:col-span-4 min-[760px]:row-span-2 min-[930px]:col-span-3 min-[930px]:row-span-3"
                                          : ""
                }  w-full overflow-hidden`}
              >
                <a href={url} target="_blank">
                  <div
                    aria-label={item.alt_description}
                    className="h-full w-full scale-110 transition-all duration-300 ease-in-out hover:scale-100"
                    key={item.id}
                    style={{
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center min-[560px]:mt-16">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
            onClick={() => {
              setPageNumber((prev) => prev - 1);
              window.scrollTo(0, 0);
            }}
          >
            <GrFormPrevious className="text-2xl" />
          </button>
          <div className="px-5 text-lg font-semibold tracking-wider dark:text-gray-200">
            {pageNumber}
          </div>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
            onClick={() => {
              setPageNumber((prev) => prev + 1);
              window.scrollTo(0, 0);
            }}
          >
            <GrFormNext className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
