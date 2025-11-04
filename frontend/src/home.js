import { useState, useEffect, useCallback } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Clear from "@material-ui/icons/Clear";
import BugReportIcon from "@material-ui/icons/BugReport";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import axios from "axios";

const GlowButton = withStyles((theme) => ({
  root: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    border: "2px solid transparent",
    borderRadius: "25px",
    color: "white",
    fontWeight: 700,
    fontSize: "16px",
    textTransform: "none",
    padding: "12px 30px",
    boxShadow: "0 8px 32px rgba(255, 107, 107, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 12px 40px rgba(255, 107, 107, 0.6)",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "25px",
    padding: "15px 22px",
    fontSize: "18px",
    fontWeight: 700,
    textTransform: "none",
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
    borderRadius: "15px 15px 0 0",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
      `,
      pointerEvents: "none",
    },
  },
  imageCard: {
    margin: "auto",
    maxWidth: 450,
    minHeight: 500,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 35px 70px rgba(0, 0, 0, 0.3)",
    },
  },
  imageCardEmpty: {
    height: "auto",
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: "none",
  },
  uploadIcon: {
    background: "white",
  },
  tableContainer: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "15px",
    boxShadow: "none",
  },
  table: {
    backgroundColor: "transparent !important",
  },
  tableHead: {
    backgroundColor: "transparent !important",
  },
  tableRow: {
    backgroundColor: "transparent !important",
  },
  tableCell: {
    fontSize: "20px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#ffffff !important",
    fontWeight: 700,
    padding: "16px 24px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
  tableCell1: {
    fontSize: "16px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "rgba(255, 255, 255, 0.8) !important",
    fontWeight: 600,
    padding: "12px 24px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
  tableBody: {
    backgroundColor: "transparent !important",
  },
  text: {
    color: "white !important",
    textAlign: "center",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
  buttonGrid: {
    maxWidth: "450px",
    width: "100%",
  },
  detail: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0 0 20px 20px",
    padding: "20px",
  },
  appbar: {
    background:
      "linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%)",
    backdropFilter: "blur(20px)",
    border: "none",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    color: "white",
  },
  title: {
    fontWeight: 700,
    fontSize: "24px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
  subtitle: {
    fontWeight: 400,
    fontSize: "16px",
    opacity: 0.9,
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
  loader: {
    color: "#ffffff !important",
    marginBottom: "16px",
  },
  copyright: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(10px)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 500,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
  },
  processingText: {
    color: "white",
    fontWeight: 600,
    fontSize: "18px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    marginTop: "12px",
  },
  confidenceChip: {
    background: (confidence) => {
      if (confidence >= 90)
        return "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)";
      if (confidence >= 70)
        return "linear-gradient(135deg, #ff9800 0%, #ffc107 100%)";
      return "linear-gradient(135deg, #f44336 0%, #e91e63 100%)";
    },
    color: "white",
    fontWeight: 700,
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "16px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
  },
}));
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = useCallback(async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }, [image, selectedFile]);

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview, sendFile]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Box>
            <Typography className={classes.title} variant="h5" noWrap>
              🍃 AI Plant Disease Classifier
            </Typography>
            <Typography className={classes.subtitle} variant="body2" noWrap>
              Advanced Neural Network Diagnosis System
            </Typography>
          </Box>
          <div className={classes.grow} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <BugReportIcon sx={{ fontSize: 32, color: "#4caf50" }} />
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth={false}
        className={classes.mainContainer}
        disableGutters={true}
      >
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card
              className={`${classes.imageCard} ${
                !image ? classes.imageCardEmpty : ""
              }`}
            >
              {image && (
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="image"
                    title="Plant Leaf Analysis"
                  />
                </CardActionArea>
              )}
              {!image && (
                <CardContent className={classes.content}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={
                      "🔬 Drop your plant leaf image here for AI analysis"
                    }
                    onChange={onSelectFile}
                    showFileNames={true}
                    maxFileSize={5000000}
                    filesLimit={1}
                    dropzoneClass="futuristic-dropzone"
                  />
                </CardContent>
              )}
              {data && (
                <CardContent className={classes.detail}>
                  <Box sx={{ mb: 2 }}>
                    <CheckCircleIcon
                      sx={{ fontSize: 48, color: "#4caf50", mb: 1 }}
                    />
                  </Box>
                  <TableContainer
                    component={Paper}
                    className={classes.tableContainer}
                  >
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="analysis results"
                    >
                      <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>
                            🔍 Diagnosis:
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.tableCell1}
                          >
                            📊 Confidence:
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className={classes.tableBody}>
                        <TableRow className={classes.tableRow}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableCell}
                          >
                            {data.class}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.tableCell}
                          >
                            <span className={classes.confidenceChip}>
                              {confidence}%
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
              {isLoading && (
                <CardContent className={classes.detail}>
                  <CircularProgress size={60} className={classes.loader} />
                  <Typography
                    className={classes.processingText}
                    variant="h6"
                    noWrap
                  >
                    🧠 AI Processing...
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)", mt: 1 }}
                  >
                    Analyzing cellular patterns
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
          {data && (
            <Grid item className={classes.buttonGrid}>
              <GlowButton
                variant="contained"
                className={classes.clearButton}
                color="primary"
                component="span"
                size="large"
                onClick={clearData}
                startIcon={<Clear fontSize="large" />}
              >
                🔄 Analyze Another Sample
              </GlowButton>
            </Grid>
          )}
        </Grid>

        {/* Copyright */}
        <Box className={classes.copyright}>
          © 2025 Sanjanb | AI Plant Diagnostics
        </Box>
      </Container>
    </React.Fragment>
  );
};
