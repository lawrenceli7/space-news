/* eslint-disable @next/next/no-img-element */
import ArticleCard from "@/components/ArticleCard";
import ArticleList from "@/components/ArticleList";
import ArticleSearch from "@/components/ArticleSearch";
import ArticleStatistics from "@/components/ArticleStatistics";
import ArticleTable from "@/components/ArticleTable";
import { Divider, Pagination, Switch, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [tableView, setTableView] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);


  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      const offset = (currentPage - 1) * pageSize;
      const response = await axios.get(
        `https://api.spaceflightnewsapi.net/v4/articles?_start=${offset}&_limit=${pageSize}&_sort=publishedDate:DESC`
      );

      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setArticles(response.data);
        setTotalPages(Math.ceil(response.headers['x-total-count'] / pageSize));
        setTotalArticles(response.headers['x-total-count']);
      } else if (Array.isArray(response.data.results)) {
        setArticles(response.data.results);
        setTotalPages(Math.ceil(response.headers['x-total-count'] / pageSize));
        setTotalArticles(response.headers['x-total-count']);
      } else {
        console.error("API response does not contain an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 10);
    fetchData();
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.spaceflightnewsapi.net/v4/articles?search=${query}`
      );

      console.log('Search Query:', query);
      console.log('Search Response:', response.data);

      if (Array.isArray(response.data)) {
        setArticles(response.data);
      } else if (Array.isArray(response.data.results)) {
        setArticles(response.data.results);
      } else {
        console.error('Search response does not contain an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, fetchData]);

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "News Source", dataIndex: "news_site", key: "news_site" },
    {
      title: "Published At",
      dataIndex: "published_at",
      key: "published_at",
      render: (text: string) => {
        const options: Intl.DateTimeFormatOptions = {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };

        return new Date(text).toLocaleString("en-US", options);
      },
    },
  ];

  const handleViewChange = (checked: boolean) => {
    setTableView(checked ? "table" : "grid");
  };

  return (
    <div style={{ maxWidth: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "10px" }}>
        <span style={{ marginRight: "5px" }}>View as:</span>
        <Switch
          checkedChildren="Table"
          unCheckedChildren="Grid"
          defaultChecked={tableView === "table"}
          onChange={handleViewChange}
        />
        <span style={{ marginLeft: "5px" }}>(Switch between Table and Grid view)</span>
      </div>

      <ArticleSearch onSearch={handleSearch} />
      <Typography.Title level={2}>Article Statistics</Typography.Title>
      <ArticleStatistics articles={articles} />

      <Divider />
      <Typography.Title level={2}>Articles</Typography.Title>

      {tableView === "table" ? (
        <div>
          <ArticleTable
            articles={articles}
            loading={loading}
            pageSize={pageSize}
            totalArticles={totalArticles}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <div>
          <ArticleList
            articles={articles}
            loading={loading}
            pageSize={pageSize}
            totalArticles={totalArticles}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default NewsPage;
