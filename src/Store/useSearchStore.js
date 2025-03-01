import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { config } from "../env-services";

const useSearchStore = create(
  persist(
    (set, get) => ({
      filters: {
        searchKey: "",
        city: "",
        categoryId: "",
        businessName: "",
      },
      results: [],
      loading: false,
      error: "",
      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
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
            url: `http://13.234.223.21:8080/search/businesses?${params}`,
            headers: {},
          };

          axios
            .request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              set({ results: response.data.data, loading: false });
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
    }),
    {
      name: "search-store",
      getStorage: () => localStorage,
    }
  )
);

export default useSearchStore;
