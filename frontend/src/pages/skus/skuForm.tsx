import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Grid,  Container } from "@mui/material";
import { addSkuThunk, updateSkuThunk } from "../../store/thunk/skuThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { SkuType } from "../../utils/types";

interface SkuFormProps {
  defaultValues?: SkuType | null;
  handleCloseDialog: Function;
  getskuList: Function;
}

const SkuForm: React.FC<SkuFormProps> = ({
  defaultValues,
  handleCloseDialog,
  getskuList,
}) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkuType>({
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<SkuType> = (data) => {
    if (data.id) {
      dispatch(
        updateSkuThunk({
          payload: { ...data },
        })
      ).then(() => {
        handleCloseDialog();
        getskuList();
      });
    } else {
      dispatch(
        addSkuThunk({
          payload: data,
        })
      ).then(() => {
        handleCloseDialog();
        getskuList();
      });
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ pt: 2 }}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("medication_name", {
                  required: "Medication  name is required",
                })}
                variant="outlined"
                fullWidth
                id="medication_name"
                label="Medication Name"
                error={!!errors.medication_name}
                helperText={errors.medication_name ? errors.medication_name.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("dose", {
                  required: "Dose name is required",
                })}
                variant="outlined"
                fullWidth
                id="dose"
                label="Dose"
                error={!!errors.dose}
                helperText={errors.dose ? errors.dose.message : ""}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                {...register("presentation", {
                  required: "Presentation name is required",
                })}
                variant="outlined"
                fullWidth
                id="presentation"
                label="Presentation Name"
                error={!!errors.presentation}
                helperText={errors.presentation ? errors.presentation.message : ""}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                {...register("unit", {
                  required: "Unit name is required",
                })}
                variant="outlined"
                fullWidth
                id="unit"
                label="Unit Name"
                error={!!errors.unit}
                helperText={errors.unit ? errors.unit.message : ""}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                {...register("countries", {
                  required: "Countries name is required",
                })}
                variant="outlined"
                fullWidth
                id="countries"
                label="Countries"
                error={!!errors.countries}
                helperText={errors.countries ? errors.countries.message : ""}
              />
            </Grid>            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
          >
            {defaultValues?.id ? `Update` : `Create`} Sku
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SkuForm;
