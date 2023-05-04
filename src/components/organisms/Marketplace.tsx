import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../atoms/Card";
import { Result } from "@/types/results";
import { useDetectScrollBottom } from "@/hooks/useDetectScrollBottom";
import SearchBar from "../atoms/SearchBar";

const Marketplace = () => {
  const [collection, setCollection] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<string | null>(null);

  // fixed query batch limit
  const limit = 20;

  const isScrollBottom = useDetectScrollBottom();

  const apiBaseUrl =
    "https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol";

  const fetchMarketplace = async (
    pg: number,
    maxRetries = 3,
    retryInterval = 1000
  ) => {
    const fetchData = async (retriesLeft: number) => {
      try {
        const res = await axios.get(apiBaseUrl, {
          params: {
            collectionSymbol: "okay_bears",
            limit: limit,
            offset: pg * limit,
          },
        });

        // console.log("response: ", res.data.results);
        setCollection((prev) => [...prev, ...res.data.results]);
      } catch (error) {
        console.log("error fetching API: ", error);

        if (retriesLeft > 0) {
          console.log(`Retrying in ${retryInterval}ms...`);
          setTimeout(() => {
            fetchData(retriesLeft - 1);
          }, retryInterval);
        } else {
          console.log("Max retries reached. Giving up.");
        }
      }
    };

    fetchData(maxRetries);
  };

  useEffect(() => {
    // show loading text on initial load
    setIsLoading(true);
    fetchMarketplace(page);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // fetch new page of data each time bottom of component is reached
    const onScroll = () => {
      if (isScrollBottom && !isLoading) {
        setPage((prev) => prev + 1);
        fetchMarketplace(page + 1);
      }
    };
    onScroll();
  }, [isScrollBottom]);

  return (
    <div className="w-full">
      <div className="w-fit mx-auto mb-10">
        <SearchBar
          setSearchParams={setSearchParams}
          type="text"
          subject="NFTs"
        />
      </div>
      <div
        className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 
        lg:grid-col s-3 xl:grid-cols-4 gap-4 sm:gap-10"
      >
        {collection
          .filter(
            (item: Result) =>
              searchParams === null || item.title.includes(searchParams)
          )
          .map((item: Result, index: number) => (
            <Card data={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Marketplace;
