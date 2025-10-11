import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { config } from "../env-services";
// import { useAuth } from "../utils/AuthContext";

// const {authToken} = useAuth()

const useSearchStore = create(
  persist(
    (set, get) => ({
      filters: {
        searchKey: "",
        city: "",
        categoryId: "",
        businessName: "",
        page: 1,
      },
      selectedSuggestion: {
        value: "",
        type: "",
      },
      isLocationAutoDetected: true,
      results: [],
      loading: false,
      error: "",
      totalPages: 1,
      totalResults: 0,
      currentPage: 1,
      resultsPerPage: 10,

      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),
      setSelectedSuggestion: (value, type) =>
        set(() => ({
          selectedSuggestion: {
            value,
            type,
          },
        })),

      setIsLocationAutoDetected: (value) =>
        set((state) => ({
          isLocationAutoDetected: value,
        })),

      removeFilter: (key) =>
        set((state) => {
          const updatedFilters = { ...state.filters };
          delete updatedFilters[key];
          return { filters: updatedFilters };
        }),
      fetchSearchResults: async () => {
        const { filters } = get();

        // Optional - Clean filters
        const cleanedFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value)
        );

        set({ loading: true, error: null });

        const params = new URLSearchParams(filters);

        try {
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `https://stage-api.localmart.app:8443/search/businesses?${params}`,
            headers: {
              // "Authorization": "Bearer " +  authToken ? authToken : '' ,
              "content-type": "application/json",
            },
          };

          axios
            .request(config)
            .then((response) => {
              console.log(
                "🔍 Full API Response:",
                JSON.stringify(response.data, null, 2)
              );
              const responseData = response.data;

              // Debug: Log the structure to understand the API response
              console.log("🔍 Response structure:", {
                data: responseData.data,
                totalPages: responseData?.totalPages,
                totalResults: responseData?.totalResults,
                total: responseData?.total,
                count: responseData?.count,
                totalCount: responseData?.totalCount,
                currentPage: responseData?.currentPage,
                page: responseData?.page,
                perPage: responseData?.perPage,
                resultsPerPage: responseData?.resultsPerPage,
              });

              set({
                results: responseData.data || [],
                loading: false,
                totalPages: responseData?.totalPages || 1,
                totalResults:
                  responseData?.totalResults ||
                  responseData?.total ||
                  responseData?.count ||
                  responseData?.totalCount ||
                  (responseData.data ? responseData.data.length : 0),
                currentPage:
                  responseData?.currentPage ||
                  responseData?.page ||
                  filters.page ||
                  1,
                resultsPerPage:
                  responseData?.resultsPerPage ||
                  responseData?.perPage ||
                  responseData?.limit ||
                  10,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (err) {
          set({
            error: err.message || "Failed to fetch search results",
            loading: false,
          });
        }
      },
      resetFilters: () =>
        set({ filters: { searchKey: "", city: "", category: "" } }),

      // Helper function to get pagination display info
      getPaginationInfo: () => {
        const { totalResults, currentPage, resultsPerPage, totalPages } = get();
        const startResult =
          totalResults > 0 ? (currentPage - 1) * resultsPerPage + 1 : 0;
        const endResult = Math.min(currentPage * resultsPerPage, totalResults);

        return {
          startResult,
          endResult,
          totalResults,
          currentPage,
          totalPages,
          resultsPerPage,
          hasResults: totalResults > 0,
          showingText:
            totalResults > 0
              ? `Showing ${startResult}-${endResult} of ${totalResults} results`
              : "No results found",
        };
      },
    }),
    {
      name: "search-store",
      getStorage: () => localStorage,
    }
  )
);

export default useSearchStore;
