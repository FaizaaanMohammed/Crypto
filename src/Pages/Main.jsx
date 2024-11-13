import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../Helper/Api/Axios";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const Main = () => {
  const { data, refetch } = useQuery({
    queryKey: "key",
    queryFn: axiosInstance,
  });
  //   console.log("data", data?.data?.data);
  const [search, setSearch] = useState("");
  //   console.log('search',search);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const handleClickPrice = () => {
    // console.log('clicked');
    const storedata = data?.data?.data?.sort((a, b) => {
      return a.priceUsd - b.priceUsd;
    });
    setPrice(storedata);
  };
  useEffect(() => {
    setPrice();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="center"
          sx={{ borderBottom: "1px solid black" }}
        >
          <Grid item md={6} justifyContent="center">
            <Box>
              <h1 style={{ textAlign: "center" }}>
                <span
                  style={{
                    margin: "0px",
                    marginRight: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  Search{" "}
                </span>
                <input
                  type="text"
                  style={{ padding: "12px" }}
                  placeholder="Search here.."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </h1>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0px",
                }}
              >
                <Button variant="contained" onClick={refetch}>
                  Refresh Me
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={12}>
            <Box>
              <TableContainer component="paper">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>RANK</b>
                      </TableCell>
                      <TableCell>
                        <b>NAME</b>
                      </TableCell>
                      <TableCell>
                        <b>ID</b>
                      </TableCell>
                      <TableCell>
                        <b>SYMBOL</b>
                      </TableCell>
                      <TableCell>
                        <b>PRICE</b>
                        <SwapVertIcon
                          onClick={handleClickPrice}
                          sx={{ cursor: "pointer" }}
                        />
                      </TableCell>
                      <TableCell>
                        <b>MARKETCAP</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data?.data
                      .filter((item) => {
                        if (search === "") {
                          return item;
                        } else if (
                          item.name.toLowerCase().includes(search.toLowerCase())
                        ) {
                          return item;
                        }
                      })
                      .map((row) => (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{row.rank}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.symbol}</TableCell>
                          <TableCell>
                            {`${row.priceUsd.slice(0, 7)} $`}
                          </TableCell>
                          <TableCell>{`${row.marketCapUsd.slice(
                            0,
                            15
                          )} $`}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Main;
