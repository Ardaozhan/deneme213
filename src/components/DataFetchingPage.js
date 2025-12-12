import React, { useState, useEffect } from "react";
import axios from "axios";

const DataFetchingPage = ({ onDataFetched }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://tjk.org/api/gunluk-yaris-programi");
        setData(response.data);
        onDataFetched(response.data); // Veri üst bileşene gönderiliyor
        setLoading(false);
      } catch (err) {
        setError("Veri alınırken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchData();
  }, [onDataFetched]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Veri Sayfası</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetchingPage;
