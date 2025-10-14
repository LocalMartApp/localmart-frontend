import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { config } from "../env-services";
import toast from "react-hot-toast";

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  const storedToken = localStorage.getItem("authToken");
  if (!storedToken) return null;

  try {
    const tokenObject = JSON.parse(storedToken);
    // Handle both old format (token.token) and new format (direct token)
    return tokenObject?.token || tokenObject;
  } catch (error) {
    console.error("Error parsing auth token:", error);
    return null;
  }
};

const useSaveBusinessStore = create(
  persist(
    (set, get) => ({
      // State
      favoriteBusinesses: [],
      favoriteBusinessData: [], // Store full business data
      loading: false,
      error: "",

      // Add business to favorites
      addToFavorites: async (businessId) => {
        const { favoriteBusinesses, favoriteBusinessData } = get();

        // Validate businessId
        if (
          !businessId ||
          businessId === "undefined" ||
          businessId === "null"
        ) {
          console.error("💾 Invalid businessId:", businessId);
          return { success: false, message: "Invalid business ID" };
        }

        // Check if already in favorites
        if (favoriteBusinesses.includes(businessId)) {
          console.log("💾 Business already saved:", businessId);
          return { success: true, message: "Already in favorites" };
        }

        set({ loading: true, error: null });

        try {
          const authToken = await getAuthToken();
          if (!authToken) {
            toast.error('Login to save the business')
            throw new Error(
              "Authentication token not found. Please login again."
            );
          }

          console.log("💾 Adding business to saved:", businessId);

          const requestBody = JSON.stringify({
            businessId: businessId,
          });

          const response = await fetch(`${config.api}favorites`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: requestBody,
          });

          const responseData = await response.json();
          console.log(
            "💾 Add to saved response:",
            JSON.stringify(responseData, null, 2)
          );

          if (response.ok) {
            // Update local state immediately for better UX
            set((state) => {
              const newFavorites = [...state.favoriteBusinesses, businessId];
              return {
                favoriteBusinesses: newFavorites,
                loading: false,
                error: null,
              };
            });

            // Refresh favorites data from server to get the complete business object
            await get().fetchUserFavorites();

            return { success: true, message: "Added to favorites" };
          } else {
            console.error("💾 API Error Response:", responseData);
            throw new Error(
              responseData.message ||
                responseData.error ||
                "Failed to add to favorites"
            );
          }
        } catch (err) {
          console.error("💾 Add to saved error:", err);
          set({
            error: err.message || "Failed to add to favorites",
            loading: false,
          });
          return { success: false, message: err.message };
        }
      },

      // Remove business from favorites
      removeFromFavorites: async (businessId) => {
        const { favoriteBusinesses, favoriteBusinessData } = get();

        // Check if not in favorites
        if (!favoriteBusinesses.includes(businessId)) {
          console.log("💾 Business not saved:", businessId);
          return { success: true, message: "Not in favorites" };
        }

        set({ loading: true, error: null });

        try {
          const authToken = await getAuthToken();
          if (!authToken) {
            toast.error('Login to remove the business')
            throw new Error(
              "Authentication token not found. Please login again."
            );
          }

          console.log("💾 Removing business from saved:", businessId);

          const response = await fetch(`${config.api}favorites/${businessId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          const responseData = await response.json();
          console.log(
            "💾 Remove from saved response:",
            JSON.stringify(responseData, null, 2)
          );

          if (response.ok) {
            // Update local state immediately for better UX
            set((state) => ({
              favoriteBusinesses: state.favoriteBusinesses.filter(
                (id) => id !== businessId
              ),
              favoriteBusinessData: state.favoriteBusinessData.filter(
                (business) => business._id !== businessId
              ),
              loading: false,
              error: null,
            }));

            return { success: true, message: "Removed from favorites" };
          } else {
            console.error("💾 API Error Response:", responseData);
            throw new Error(
              responseData.message ||
                responseData.error ||
                "Failed to remove from favorites"
            );
          }
        } catch (err) {
          console.error("💾 Remove from saved error:", err);
          set({
            error: err.message || "Failed to remove from favorites",
            loading: false,
          });
          return { success: false, message: err.message };
        }
      },

      // Toggle favorite status
      toggleFavorite: async (businessId) => {
        const { favoriteBusinesses } = get();
        const isFavorite = favoriteBusinesses.includes(businessId);

        if (isFavorite) {
          return await get().removeFromFavorites(businessId);
        } else {
          return await get().addToFavorites(businessId);
        }
      },

      // Add business with full data to favorites (useful when you have the complete business object)
      addBusinessToFavorites: async (businessData) => {
        if (!businessData || !businessData._id) {
          console.error("💾 Invalid business data:", businessData);
          return { success: false, message: "Invalid business data" };
        }

        const { favoriteBusinesses } = get();

        // Check if already in favorites
        if (favoriteBusinesses.includes(businessData._id)) {
          console.log("💾 Business already saved:", businessData._id);
          return { success: true, message: "Already in favorites" };
        }

        // First add to server
        const result = await get().addToFavorites(businessData._id);

        if (result.success) {
          // If server add was successful, also add the business data to local state
          set((state) => ({
            favoriteBusinessData: [...state.favoriteBusinessData, businessData],
          }));
        }

        return result;
      },

      // Bulk add businesses to favorites
      addMultipleToFavorites: async (businessIds) => {
        if (!Array.isArray(businessIds) || businessIds.length === 0) {
          return { success: false, message: "Invalid business IDs array" };
        }

        const results = [];
        for (const businessId of businessIds) {
          const result = await get().addToFavorites(businessId);
          results.push({ businessId, ...result });
        }

        const successCount = results.filter((r) => r.success).length;
        return {
          success: successCount > 0,
          message: `Added ${successCount} out of ${businessIds.length} businesses to favorites`,
          results,
        };
      },

      // Bulk remove businesses from favorites
      removeMultipleFromFavorites: async (businessIds) => {
        if (!Array.isArray(businessIds) || businessIds.length === 0) {
          return { success: false, message: "Invalid business IDs array" };
        }

        const results = [];
        for (const businessId of businessIds) {
          const result = await get().removeFromFavorites(businessId);
          results.push({ businessId, ...result });
        }

        const successCount = results.filter((r) => r.success).length;
        return {
          success: successCount > 0,
          message: `Removed ${successCount} out of ${businessIds.length} businesses from favorites`,
          results,
        };
      },

      // Check if business is favorite
      isFavorite: (businessId) => {
        const { favoriteBusinesses } = get();
        const isFav = favoriteBusinesses.includes(businessId);
        console.log("💾 isSaved check:", {
          businessId,
          favoriteBusinesses,
          isFav,
        });
        return isFav;
      },

      // Sync favorites with server to get accurate state
      syncFavoritesWithServer: async () => {
        try {
          const authToken = await getAuthToken();
          if (!authToken) {
            console.log("No auth token, skipping favorites sync");
            return;
          }

          console.log("🔄 Syncing favorites with server...");
          const response = await fetch(`${config.api}favorites`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          const responseData = await response.json();
          console.log(
            "🔄 Server favorites response:",
            JSON.stringify(responseData, null, 2)
          );

          if (response.ok && responseData.data) {
            // Extract business IDs from the server response
            const serverFavoriteIds = responseData.data
              .map((favorite) => {
                // Handle different possible structures
                if (
                  favorite.businessId &&
                  typeof favorite.businessId === "object"
                ) {
                  return favorite.businessId._id || favorite.businessId.id;
                } else if (
                  favorite.businessId &&
                  typeof favorite.businessId === "string"
                ) {
                  return favorite.businessId;
                } else if (
                  favorite.business &&
                  typeof favorite.business === "object"
                ) {
                  return favorite.business._id || favorite.business.id;
                } else if (favorite._id) {
                  return favorite._id;
                }
                return null;
              })
              .filter((id) => id !== null);

            console.log("🔄 Server favorite IDs:", serverFavoriteIds);

            set({
              favoriteBusinesses: serverFavoriteIds,
              favoriteBusinessData: responseData.data || [],
            });
          }
        } catch (error) {
          console.error("🔄 Error syncing favorites:", error);
        }
      },

      // Get all favorite business IDs
      getFavoriteBusinesses: () => {
        const { favoriteBusinesses } = get();
        return favoriteBusinesses;
      },

      // Force refresh favorites state (useful for debugging)
      forceRefreshFavorites: () => {
        const state = get();
        console.log("🔄 Force refreshing favorites state:", state);
        set({ ...state }); // Trigger re-render
      },

      // Get all favorite business data
      getFavoriteBusinessData: () => {
        const { favoriteBusinessData } = get();
        return favoriteBusinessData;
      },

      // Fetch user's favorites from server
      fetchUserFavorites: async () => {
        try {
          const authToken = await getAuthToken();
          if (!authToken) {
            console.log("No auth token, skipping favorites fetch");
            return;
          }

          set({ loading: true, error: null });

          const response = await fetch(`${config.api}favorites`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          });

          const responseData = await response.json();
          console.log(
            "💾 Saved API Response:",
            JSON.stringify(responseData, null, 2)
          );

          if (response.ok) {
            // Handle the new API response structure
            let favoritesData = [];
            let favoriteIds = [];

            // Check if response has the expected structure
            if (
              responseData.status === "success" &&
              Array.isArray(responseData.data)
            ) {
              favoritesData = responseData.data;

              // Extract business IDs from the new response format
              favoriteIds = favoritesData
                .map((business) => {
                  // The new API returns business objects directly with _id field
                  return business._id;
                })
                .filter((id) => id !== null);

              console.log("💾 Extracted saved IDs:", favoriteIds);
              console.log("💾 Saved data count:", favoritesData.length);

              set({
                favoriteBusinesses: favoriteIds,
                favoriteBusinessData: favoritesData,
                loading: false,
                error: null,
              });
            } else {
              console.error("💾 Unexpected response structure:", responseData);
              throw new Error(
                "Unexpected response structure from favorites API"
              );
            }
          } else {
            const errorMessage =
              responseData.message ||
              responseData.error ||
              `HTTP ${response.status}: Failed to fetch favorites`;
            console.error("💾 API Error:", errorMessage);
            throw new Error(errorMessage);
          }
        } catch (err) {
          console.error("💾 Fetch saved error:", err);
          set({
            error: err.message || "Failed to fetch favorites",
            loading: false,
          });
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Debug function to get current state
      getCurrentState: () => {
        const state = get();
        console.log("💾 Current saved store state:", state);
        return state;
      },

      // Reset store
      reset: () => {
        set({
          favoriteBusinesses: [],
          favoriteBusinessData: [],
          loading: false,
          error: "",
        });
      },
    }),
    {
      name: "save-business-store",
      getStorage: () => localStorage,
    }
  )
);

export default useSaveBusinessStore;
