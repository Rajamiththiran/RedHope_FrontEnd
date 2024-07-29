import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getDonationHistory, getRequestNotifications } from "../auth_service";

const CommonGraph = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [graphType, setGraphType] = useState("line");
  const [data, setData] = useState({
    dailyData: [],
    bloodTypeData: [],
    totalDonations: 0,
    totalRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, bloodType]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [donationHistory, requests] = await Promise.all([
        getDonationHistory(),
        getRequestNotifications(bloodType),
      ]);

      const processedData = processData(donationHistory, requests);
      setData(processedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
      setLoading(false);
    }
  };

  const processData = (donations, requests) => {
    const dailyCounts = {};
    const bloodTypeCounts = {};
    let totalDonations = 0;
    let totalRequests = 0;

    donations.forEach((donation) => {
      const date = new Date(donation.donation_date).toISOString().split("T")[0];
      if (!dailyCounts[date]) dailyCounts[date] = { donations: 0, requests: 0 };
      dailyCounts[date].donations++;

      if (!bloodTypeCounts[donation.blood_type])
        bloodTypeCounts[donation.blood_type] = { donations: 0, requests: 0 };
      bloodTypeCounts[donation.blood_type].donations++;

      totalDonations++;
    });

    requests.forEach((request) => {
      const date = new Date(request.created_at).toISOString().split("T")[0];
      if (!dailyCounts[date]) dailyCounts[date] = { donations: 0, requests: 0 };
      dailyCounts[date].requests++;

      if (!bloodTypeCounts[request.blood_type_requested])
        bloodTypeCounts[request.blood_type_requested] = {
          donations: 0,
          requests: 0,
        };
      bloodTypeCounts[request.blood_type_requested].requests++;

      totalRequests++;
    });

    const dailyData = Object.entries(dailyCounts)
      .map(([date, counts]) => ({
        date,
        donations: counts.donations,
        requests: counts.requests,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const bloodTypeData = Object.entries(bloodTypeCounts).map(
      ([bloodType, counts]) => ({
        bloodType,
        donations: counts.donations,
        requests: counts.requests,
      })
    );

    return {
      dailyData,
      bloodTypeData,
      totalDonations,
      totalRequests,
    };
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Blood Type</InputLabel>
          <Select
            value={bloodType}
            label="Blood Type"
            onChange={(e) => setBloodType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="AB-">AB-</MenuItem>
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="O-">O-</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Graph Type</InputLabel>
          <Select
            value={graphType}
            label="Graph Type"
            onChange={(e) => setGraphType(e.target.value)}
          >
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="area">Area</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <p>Total Donations: {data.totalDonations}</p>
        <p>Total Requests: {data.totalRequests}</p>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data.dailyData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="donations"
            stroke="#FFA500"
            activeDot={{ r: 8 }}
            name="Donation Count"
          />
          <Line
            type="monotone"
            dataKey="requests"
            stroke="#4CAF50"
            activeDot={{ r: 8 }}
            name="Request Count"
          />
        </LineChart>
      </ResponsiveContainer>
      <Box sx={{ mt: 4 }}>
        <h3>Counts by Blood Type</h3>
        <table>
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Donations</th>
              <th>Requests</th>
            </tr>
          </thead>
          <tbody>
            {data.bloodTypeData.map((item) => (
              <tr key={item.bloodType}>
                <td>{item.bloodType}</td>
                <td>{item.donations}</td>
                <td>{item.requests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default CommonGraph;
