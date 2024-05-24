import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotification } from "../slices/userNotificationSlice";
import config from "../../config/config";
import axios from "axios";
import { setSkuList } from "../slices/skuSlice";

// Thunk to fetch skus
export const getSkuThunk = createAsyncThunk(
  "get", // Thunk action name
  async (_request: any, { dispatch }) => {
    try {
      return axios
        .get(`${config.url}api/skus/`) // Make a GET request to fetch skus
        .then((response: any) => {
          dispatch(setSkuList(response.data)); // Dispatch action to set sku list
        })
        .catch((error: any) => {
          dispatch(
            addNotification({
              message:
                error?.response?.data?.message ||
                "Error while trying getting Sku.", // Dispatch notification for error while fetching skus
            })
          );
        });
    } catch (error) {}
  }
);


// Thunk to add a new sku
export const addSkuThunk = createAsyncThunk(
  "add", // Thunk action name
  async (_request: any, { dispatch }) => {
    try {
      return axios
        .post(`${config.url}api/skus/`, (_request.payload))
        .then(() => {
          dispatch(
            addNotification({
              message: "Sku Created successfully", // Dispatch notification for successful sku creation
            })
          );
        })
        .catch((error: any) => {
          dispatch(
            addNotification({
              message:
                error?.response?.data?.message ||
                "Error while trying create a new Sku.", // Dispatch notification for error while creating sku
            })
          );
        });
    } catch (error) {}
  }
);


// Thunk to update a sku
export const updateSkuThunk = createAsyncThunk(
  "udpate", // Thunk action name
  async (_request: any, { dispatch }) => {
    try {
      return axios
        .put(
          `${config.url}api/skus/${_request.payload.id}/`, // Make a PATCH request to update sku
          _request.payload // Convert payload to FormData
        )
        .then(() => {
          dispatch(
            addNotification({
              message: "Sku updated successfully", // Dispatch notification for successful sku update
            })
          );
        })
        .catch((error: any) => {
          dispatch(
            addNotification({
              message:
                error?.response?.data?.message ||
                "Error while trying update a new Sku.", // Dispatch notification for error while updating sku
            })
          );
        });
    } catch (error) {}
  }
);

// Thunk to delete a sku
export const deleteSkuThunk = createAsyncThunk(
  "delete", // Thunk action name
  async (_request: any, { dispatch }) => {
    try {
      return axios
        .delete(`${config.url}api/skus/${_request.payload.id}/`)
        .then(() => {
          dispatch(
            addNotification({
              message: "Sku deleted successfully", // Dispatch notification for successful sku deletion
            })
          );
        })
        .catch((error: any) => {
          dispatch(
            addNotification({
              message:
                error?.response?.data?.message ||
                "Error while trying delete a new Sku.", // Dispatch notification for error while deleting sku
            })
          );
        });
    } catch (error) {}
  }
);
