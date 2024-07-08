import React, { useState, useEffect } from 'react';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('March');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0
  });
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [search, month, page]);

  const fetchData = async () => {
    const [transactionsResponse, statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
      fetch(`/transactions`, {
        params: {
          search,
          page,
          perPage: 10,
          month
        }
      }),
      fetch(`/statistics`, {
        params: {
          month
        }
      }),
      fetch(`/bar-chart`, {
        params: {
          month
        }
      }),
      fetch(`/pie-chart`, {
        params: {
          month
        }
      })
    ]);

    setTransactions(transactionsResponse.data);
    setStatistics(statisticsResponse.data);
    setBarChartData(barChartResponse.data);
    setPieChartData(pieChartResponse.data);
    setTotalPages(transactionsResponse.headers['total-pages']);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handlePageChange = (event) => {
    setPage(parseInt(event.target.value));
  };

  return (
    <div>
      <div>
        <input type="text" placeholder="Search transactions" value={search} onChange={handleSearch} />
        <select value={month} onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
        <div>Page {page} of {totalPages}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Category</th>
            <th>Is Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.dateOfSale}</td>
              <td>{transaction.category}</td>
              <td>{transaction.isSold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Transactions Statistics</h2>
        <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
      <div>
        <h2>Transactions Bar Chart</h2>
        {/* Implement bar chart using a library like Chart.js */}
      </div>
      <div>
        <h2>Transactions Pie Chart</h2>
        {/* Implement pie chart using a library like Chart.js */}
      </div>
    </div>
  );
};

export default TransactionsTable;