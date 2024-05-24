import React, { useEffect, useState } from "react";
import ServerSideDataTable from "../../components/table";
import ReusableDialog from "../../components/dialog";
import { Box, Button, IconButton } from "@mui/material";
import SkuForm from "./skuForm";
import { Delete, Edit } from "@mui/icons-material";
import { deleteSkuThunk, getSkuThunk } from "../../store/thunk/skuThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { SkuType } from "../../utils/types";

const SkuList: React.FC = () => {
  // Redux hooks for dispatching actions and accessing state
  const dispatch = useAppDispatch();
  const skuList =
    useAppSelector((state) => state.skuSlice?.skuList) || [];

  // State variables to manage data and dialog visibility
  const [data, setData] = useState<SkuType[]>([]);
  const [skuData, setSkuData] = useState<SkuType | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);

  // Effect to update data when skuList changes
  useEffect(() => {
    console.log("skuList", skuList);
    setData(skuList || []);
  }, [skuList]);

  // Effect to fetch sku data on component mount
  useEffect(() => {
    getskuList();
  }, []);

  const getskuList = () => {
    dispatch(
      getSkuThunk({
        payload: {
          page: 1,
          rowsPerPage: 10,
          searchText: "",
        },
      })
    );
  };

  // Open edit sku dialog
  const handleOpenDialog = (value?: number) => {
    setOpenDialog(true);
    if (value) {
      setSkuData(skuList?.find((val: SkuType) => val?.id === value) || null);
    } else {
      setSkuData(null);
    }
  };

  // Close edit sku dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSkuData(null);
  };

  // Open delete sku dialog
  const handleOpenDialogDelete = (value?: number) => {
    setOpenDialogDelete(true);
    if (value) {
      setSkuData(skuList?.find((val: SkuType) => val.id === value) || null);
    } else {
      setSkuData(null);
    }
  };

  // Close delete sku dialog
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setSkuData(null);
  };

  // Confirm sku deletion
  const handleConfirmDelete = () => {
    handleCloseDialogDelete();
    if (skuData?.id) {
      dispatch(
        deleteSkuThunk({
          payload: {
            id: skuData.id,
          },
        })
      ).then(() => {
        getskuList();
      });
    }
  };
  // Table columns configuration
  const columns = [
    { name: "medication_name", label: "Medication Name" },
    { name: "dose", label: "Dose" },
    { name: "presentation", label: "Presentation" },
    { name: "unit", label: "Unit" },
    { name: "countries", label: "Countries" },
    {
      name: "id",
      label: "Actions",
      options: {
        customBodyRender: (value: number) => {
          return (
            <div>
              {/* Edit sku button */}
              <IconButton
                onClick={() => handleOpenDialog(value)}
                aria-label="Edit"
              >
                <Edit color="primary" />
              </IconButton>
              {/* Delete sku button */}
              <IconButton
                onClick={() => handleOpenDialogDelete(value)}
                aria-label="Delete"
              >
                <Delete color="error" />
              </IconButton>
            </div>
          );
        },
      },
    },
  ];


  return (
    <Box>
      {/* Dialog for adding/editing Sku */}
      <ReusableDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        title="Add New Sku"
        content={
          <SkuForm
            defaultValues={skuData}
            handleCloseDialog={handleCloseDialog}
            getskuList={getskuList}
          />
        }
        actions={[]}
      />
      {/* Dialog for confirming Sku deletion */}
      <ReusableDialog
        open={openDialogDelete}
        handleClose={handleCloseDialogDelete}
        title="Confirmation"
        content={"Are you sure you want to delete this Sku?"}
        actions={[
          {
            label: "Cancel",
            onClick: handleCloseDialogDelete,
            color: "secondary",
          },
          { label: "Confirm", onClick: handleConfirmDelete },
        ]}
      />
      {/* Server side data table */}
      <ServerSideDataTable
        columns={columns}
        options={{
          customToolbar: () => (
            // Button to add new Sku
            <Button onClick={() => handleOpenDialog()} variant="contained">
              Add Sku
            </Button>
          ),
        }}
        data={data}
      />
    </Box>
  );
};

export default SkuList;
