import { Box, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  getAllDonationHistory,
  getAllRequests,
  getDonationHistoryByBloodType,
  getRequestsByBloodType,
} from "../auth_service";

const CHART_TYPES = ["line", "bar"];
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CommonGraph = () => {
  const [chartType, setChartType] = useState("line");
  const [bloodType, setBloodType] = useState("");
  const [requestData, setRequestData] = useState([]);
  const [donationData, setDonationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [bloodType]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let requests, donations;
      if (bloodType) {
        requests = await getRequestsByBloodType(bloodType);
        donations = await getDonationHistoryByBloodType(bloodType);
      } else {
        requests = await getAllRequests();
        donations = await getAllDonationHistory();
      }
      processData(requests, donations);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processData = (requests, donations) => {
    const requestCounts = countByDay(requests, "created_at");
    const donationCounts = countByDay(donations, "donation_date");
    setRequestData(requestCounts);
    setDonationData(donationCounts);
  };

  const countByDay = (data, dateField) => {
    const counts = {};
    data.forEach((item) => {
      const dateStr = item[dateField];
      if (!dateStr) return; // Skip if date is null or undefined
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return; // Skip if date is invalid
      const dayMonthYear = date.toISOString().split("T")[0]; // YYYY-MM-DD format
      counts[dayMonthYear] = (counts[dayMonthYear] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
  };

  const formatXAxisDate = (value) => {
    const date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}`; // DD/MM format
  };

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: { show: false },
    },
    colors: ["#4ade80", "#60a5fa"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      type: "category",
      categories: [
        ...new Set([...requestData, ...donationData].map((item) => item.date)),
      ],
      labels: {
        formatter: formatXAxisDate,
        style: { colors: "#ffffff" },
        rotate: -45,
        rotateAlways: true,
      },
      tickAmount: 10, // Adjust this value to control the number of x-axis labels
    },
    yaxis: {
      title: { text: "Count", style: { color: "#ffffff" } },
      labels: { style: { colors: "#ffffff" } },
    },
    tooltip: {
      theme: "dark",
      x: {
        formatter: (val) => new Date(val).toLocaleDateString(),
      },
      y: {
        formatter: (y) => `${y.toFixed(0)} items`,
      },
    },
    legend: {
      labels: { colors: "#ffffff" },
    },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
  };

  const chartSeries = [
    {
      name: "Requests",
      data: chartOptions.xaxis.categories.map(
        (date) => requestData.find((item) => item.date === date)?.count || 0
      ),
    },
    {
      name: "Donations",
      data: chartOptions.xaxis.categories.map(
        (date) => donationData.find((item) => item.date === date)?.count || 0
      ),
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-[#5b5b5b] to-[#3d3d3d] p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-green-700 mb-4 text-center">
        Requests and Donations Chart
      </h2>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
        <TextField
          select
          label="Chart Type"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          sx={{ minWidth: 120, bgcolor: "white", borderRadius: 1 }}
        >
          {CHART_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Blood Type"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          sx={{ minWidth: 120, bgcolor: "white", borderRadius: 1 }}
        >
          <MenuItem value="">All</MenuItem>
          {BLOOD_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {isLoading ? (
        <div className="text-white text-center">Loading...</div>
      ) : (
        <ReactApexChart
          type={chartType}
          series={chartSeries}
          options={chartOptions}
          height={400}
        />
      )}
    </div>
  );
};

export default CommonGraph;
