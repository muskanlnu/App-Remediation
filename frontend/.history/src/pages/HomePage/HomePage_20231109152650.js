import { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./HomePage.module.css";
import choose_icon from "../../resources/choose_icon.svg";
import cancel_icon from "../../resources/cancel_icon.svg";
import { ClipLoader } from "react-spinners";

const sampleResult = [
  {
    className: "SampleCloudBlockers2",
    methods: [
      {
        methodName: "uploadFileToS3",
        isCloudBlocker: true,
        whyCloudBlocker: "Uses AWS S3 SDK which is not supported in Azure.",
        suggestion:
          "Replace AWS S3 SDK with Azure Blob Storage SDK to upload files to Azure Blob Storage.",
      },
      {
        methodName: "generatePDFDocument",
        isCloudBlocker: false,
        whyCloudBlocker:
          "Not a cloud blocker, but if the file needs to be accessed across multiple instances, it should be stored in a shared storage like Azure Blob Storage.",
        suggestion:
          "If the generated PDF needs to be accessed across multiple instances, consider storing it in Azure Blob Storage instead of the local file system.",
      },
      {
        methodName: "printMessage",
        isCloudBlocker: false,
        whyCloudBlocker: "Not a cloud blocker.",
        suggestion: "No changes needed.",
      },
    ],
  },
  {
    className: "SampleCloudBlockers3",
    methods: [
      {
        methodName: "processFile",
        isCloudBlocker: true,
        whyCloudBlocker:
          "The method reads a file from the local file system which may not be available or persistent in a cloud environment.",
        suggestion:
          "Consider reading the file from a cloud storage service like Azure Blob Storage.",
      },
      {
        methodName: "uploadFileToS3",
        isCloudBlocker: true,
        whyCloudBlocker:
          "The method uploads a file to Amazon S3. If you're migrating to Azure, you'll likely want to use Azure's equivalent service.",
        suggestion:
          "Consider using Azure Blob Storage for uploading files in Azure.",
      },
      {
        methodName: "queryCloudDatabase",
        isCloudBlocker: true,
        whyCloudBlocker:
          "The method connects to a database using JDBC. In Azure, you might want to use Azure SQL Database or Cosmos DB, which may require different connection methods.",
        suggestion:
          "Consider using Azure SQL Database or Cosmos DB for database operations in Azure.",
      },
    ],
  },
  {
    className: "SampleCloudBlockers",
    methods: [
      {
        methodName: "processFile",
        isCloudBlocker: true,
        whyCloudBlocker:
          "Accesses local file system which may not be accessible or persistent in cloud environment.",
        suggestion:
          "Consider reading the file from a cloud storage service like Azure Blob Storage.",
      },
      {
        methodName: "queryCloudDatabase",
        isCloudBlocker: true,
        whyCloudBlocker:
          "Uses JDBC to connect to a database. In Azure, it's recommended to use a managed database service.",
        suggestion: "Consider using Azure SQL Database or Cosmos DB.",
      },
      {
        methodName: "uploadFileToS3",
        isCloudBlocker: true,
        whyCloudBlocker:
          "Uploads a file to Amazon S3. In Azure, you would use Azure Blob Storage instead.",
        suggestion: "Consider using Azure Blob Storage for file uploads.",
      },
      {
        methodName: "generatePDFDocument",
        isCloudBlocker: true,
        whyCloudBlocker:
          "Generates a PDF document and saves it to the local file system. In Azure, you might want to save the document to Blob Storage.",
        suggestion: "Consider saving the PDF document to Azure Blob Storage.",
      },
    ],
  },
];

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [selectedFilePath, setSelectedFilePath] = useState("");

  const selectedStyle = {
    borderLeft: "3px solid #00a2ed",
    color: "#00a2ed",
    fontWeight: 500,
  };

  const renderTab = (tabIndex) => {
    switch (tabIndex) {
      case 1:
        return (
          <FileSelectTab
            setSelectedItem={setSelectedItem}
            selectedFilePath={selectedFilePath}
            setSelectedFilePath={setSelectedFilePath}
          />
        );
      case 2:
        return (
          <ReviewTab
            setSelectedItem={setSelectedItem}
            selectedFilePath={selectedFilePath}
          />
        );
      case 3:
        return (
          <ResultTab
            setSelectedItem={setSelectedItem}
            selectedFilePath={selectedFilePath}
          />
        );
      default:
        return <FileSelectTab setSelectedItem={setSelectedItem} />;
    }
  };

  return (
    <div className={styles.homepage_body}>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div
            className={styles.sidebar_item}
            style={selectedItem === 1 ? selectedStyle : null}
            // onClick={() => setSelectedItem(1)}
          >
            Project Selection
          </div>
          <div
            className={styles.sidebar_item}
            style={selectedItem === 2 ? selectedStyle : null}
            // onClick={selectedFilePath ? () => setSelectedItem(2) : null}
          >
            Review and Validation
          </div>
          <div
            className={styles.sidebar_item}
            style={selectedItem === 3 ? selectedStyle : null}
            // onClick={() => setSelectedItem(3)}
          >
            Cloud Blocker Analysis
          </div>
        </div>
        {renderTab(selectedItem)}
      </div>
    </div>
  );
};

const FileSelectTab = ({
  setSelectedItem,
  selectedFilePath,
  setSelectedFilePath,
}) => {
  const inputRef = useRef();

  const handleInputClick = (event) => {
    inputRef.current.click();
  };

  const handleFileSelection = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFilePath(
      selectedFile ? selectedFile.webkitRelativePath || selectedFile.name : ""
    );
  };

  const clearFileSelection = () => {
    setSelectedFilePath("");
    inputRef.current.value = "";
  };

  const handleInputChange = (event) => {
    console.log(event.target.value.trim());
    setSelectedFilePath(event.target.value.trim());
  };

  const disableBtnStyle = {
    color: "darkgrey",
    backgroundColor: "lightgrey",
  };

  return (
    <div className={styles.stage_content_1}>
      <div className={styles.title}>Choose Project for Analysis</div>
      {/* <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileSelection}
      /> */}
      <div className={styles.file_selector}>
        {/* <div className={styles.select_btn} onClick={handleInputClick}>
          <div className={styles.text}>Choose File</div>
          <img src={choose_icon} />
        </div>
        <div className={styles.file_path}>
          {selectedFilePath ? selectedFilePath : "No File Chosen"}
        </div>
        {selectedFilePath && (
          <div className={styles.remove_btn} onClick={clearFileSelection}>
            <img src={cancel_icon} />
          </div>
        )} */}
        <div className={styles.input_tag}>Project File Path</div>
        <div className={styles.text_input}>
          <input
            type="text"
            placeholder="Enter the File Path"
            onChange={handleInputChange}
            ref={inputRef}
            value={selectedFilePath}
          />
          {selectedFilePath && (
            <div
              className={styles.remove_btn}
              onClick={() => {
                inputRef.current.value = "";
                setSelectedFilePath("");
              }}
            >
              <img src={cancel_icon} />
            </div>
          )}
        </div>
      </div>
      <div
        className={styles.sing_btn}
        style={!selectedFilePath ? disableBtnStyle : null}
        onClick={selectedFilePath ? () => setSelectedItem(2) : null}
      >
        Next
      </div>
    </div>
  );
};

const ReviewTab = ({ setSelectedItem, selectedFilePath }) => {
  return (
    <div className={styles.stage_content_2}>
      <div className={styles.title}>Review Selected Project Path</div>
      <div className={styles.description}>
        Ensure file path before moving to identify potential cloud blockers
      </div>
      <div className={styles.file_details}>
        File Path Selected:&nbsp;{" "}
        <strong>
          <i>{selectedFilePath}</i>
        </strong>
      </div>
      <div className={styles.btn_grp}>
        <div
          className={styles.btn1}
          onClick={() => {
            setSelectedItem(1);
          }}
        >
          Back
        </div>
        <div
          className={styles.btn2}
          onClick={() => {
            setSelectedItem(3);
          }}
        >
          Next
        </div>
      </div>
    </div>
  );
};

const ResultTab = ({ setSelectedItem, selectedFilePath }) => {
  const requestUrl = `http://localhost:8080/cloudblockers/getblockers?filePath=${selectedFilePath}`;
  const [blockersData, setBlockersData] = useState(null);
  const getResults = async () => {
    const apiResponse = await fetch(requestUrl, {
      method: "GET",
    });
    const data = apiResponse.json();
    setTimeout(() => {
      setBlockersData(sampleResult);
    }, 2000);
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className={styles.stage_content_3}>
      <div className={styles.title}>Identified Cloud Blockers</div>
      {blockersData ? (
        <div className={styles.result_content}>
          {blockersData.map((res) => (
            <ResultTile className={res.className} methods={res.methods} />
          ))}
        </div>
      ) : (
        <div className={styles.loader}>
          <ClipLoader
            color="#00a2ed"
            loading={blockersData === null}
            size={30}
          />
        </div>
      )}
      <div className={styles.btn_grp}>
        <div
          className={styles.btn1}
          onClick={() => {
            setSelectedItem(2);
          }}
        >
          Back
        </div>
        <div className={styles.btn2}>Print</div>
      </div>
    </div>
  );
};

const ResultTile = ({ className, methods }) => {
  return (
    <div className={styles.result_tile}>
      <div className={styles.class_name}>{className}.class</div>
      {methods.map((method) => (
        <div className={styles.method}>
          <div
            className={styles.method_name}
            style={{
              color: method.isCloudBlocker ? "red" : "green",
            }}
          >
            Method:{" "}
            <i>
              <strong>{method.methodName}</strong>
            </i>{" "}
            - {method.isCloudBlocker ? "Cloud Blocker" : "Not a Cloud Blocker"}
          </div>
          <div className={styles.why_blocker}>
            <div
              style={{
                fontWeight: 500,
              }}
            >
              Issue Description:
            </div>
            <ul>
              <li>{method.whyCloudBlocker}</li>
            </ul>
          </div>
          <div className={styles.suggestion}>
            <div
              style={{
                fontWeight: 500,
              }}
            >
              Recommended Action:
            </div>
            <ul>
              <li>{method.suggestion}</li>
            </ul>
          </div>
        </div>
      ))}
      <hr />
    </div>
  );
};

export default HomePage;
