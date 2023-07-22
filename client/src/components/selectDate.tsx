import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

type Props = {
  selectedMonth: number;
  selectedYear: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectDate = (props: Props) => {

  const Month = Array.from({ length: 12 }, (_, i) => i + 1).map((num) => ({
    name: `${num}月`,
    num,
  }));

  const Year = Array.from({ length: 3 }, (_, i) => i + 2022).map((num) => ({
    name: `${num}年`,
    num,
  }));

  function SelectMonth(props: Props) {
    return (
      <Box sx={{ minWidth: 100 }}>
        <FormControl>
          <InputLabel id="label" sx={{ color: "black", fontWeight: "bold" }}>month</InputLabel>
          <Select
            labelId="label"
            id="select"
            value={props.selectedMonth}
            label="month"
            onChange={(e) => {
              props.setMonth(Number(e.target.value));
            }}
            sx={{ color: "black", fontWeight: "bold" }}
          >
            {Month.map((item, index: number) => {
              return (
                <MenuItem key={index} value={item.num}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }

  function SelectYear(props: Props) {
    return (
      <Box sx={{ minWidth: 100 }}>
        <FormControl>
          <InputLabel id="label" sx={{ color: "black", fontWeight: "bold" }}>year</InputLabel>
          <Select
            labelId="label"
            id="select"
            value={props.selectedYear}
            label="month"
            onChange={(e) => {
              props.setYear(e.target.value as number);
            }}
            sx={{ color: "black", fontWeight: "bold" }}
          >
            {Year.map((item, index: number) => {
              return (
                <MenuItem key={index} value={item.num}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        margin: "40px",
        display: { xs: "none", md: "block", lg: "inline-block" },
      }}
    >
      <Grid container>
        <Grid item>{SelectYear(props)}</Grid>
        <Grid item>{SelectMonth(props)}</Grid>
      </Grid>
    </Box>
  );

}