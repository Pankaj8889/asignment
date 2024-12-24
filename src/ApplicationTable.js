import React, { useState, useEffect } from "react";
import { Table, Input, Pagination, Spin, Alert } from "antd";
import axios from "axios";

const ApplicationTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://educhain.free.beeceptor.com/applications");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Columns for the table
  const columns = [
    { title: "Application No", dataIndex: "applicationNO", key: "applicationNO", sorter: true },
    { title: "Applicant Name", dataIndex: "applicantName", key: "applicantName", sorter: true },
    { title: "Application Date", dataIndex: "applicationDate", key: "applicationDate", sorter: true },
    { title: "Student ID", dataIndex: "studentID", key: "studentID" },
    { title: "Paid Amount", dataIndex: "paidAmount", key: "paidAmount" },
    { title: "Status (English)", dataIndex: "status_En", key: "status_En" },
    { title: "Status (Arabic)", dataIndex: "status_Ar", key: "status_Ar" },
    { title: "Last Updated", dataIndex: "lastDate", key: "lastDate" },
  ];

  // Filter data based on search text
  const filteredData = data.filter(
    (item) =>
      item.applicantName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.studentID.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status_En.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Input.Search
        placeholder="Search by Applicant Name, Status, or Student ID"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      {error && <Alert message={error} type="error" />}
      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={filteredData.slice((currentPage - 1) * 10, currentPage * 10)}
          columns={columns}
          pagination={false}
          rowKey="applicationNO"
        />
      )}
      <Pagination
        current={currentPage}
        total={filteredData.length}
        pageSize={10}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default ApplicationTable;
