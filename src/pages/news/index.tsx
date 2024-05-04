/* eslint-disable @next/next/no-img-element */
import ArticleList from "@/components/ArticleList";
import ArticleSearch from "@/components/ArticleSearch";
import ArticleStatistics from "@/components/ArticleStatistics";
import ArticleTable from "@/components/ArticleTable";
import { Article } from "@/types/types";
import { Divider, Pagination, Switch, Typography } from "antd";
import { useEffect, useState } from "react";

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [tableView, setTableView] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    async function getArticles() {
      const response = await fetch(
        `https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}&offset=${offset}&ordering=-published_at`);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      setCount(data.count);
      setArticles(data.results);

    }
    getArticles().catch(console.error);

  }, [limit, offset]);

  const handlePageChange = (page: number, pageSize: number) => {
    setOffset(((page - 1) * pageSize));
    setPageSize(pageSize || 10);
    scrollTo();
  };

  const isBrowser = () => typeof window !== "undefined";

  function scrollTo() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const onShowSizeChange = (current: number, size: number) => {
    setLimit(size);
    setOffset(0);
  };

  const handleSearch = async (keyword: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.spaceflightnewsapi.net/v4/articles?search=${encodeURIComponent(keyword)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const searchData = await response.json();

      console.log('Search Keyword:', keyword);
      console.log('Search Response:', searchData);

      if (Array.isArray(searchData)) {
        setArticles(searchData);
      } else if (Array.isArray(searchData.results)) {
        setArticles(searchData.results);
      } else {
        console.error('Search response does not contain an array:', searchData);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleViewChange = (checked: boolean) => {
    setTableView(checked);
  };

  return (
    <>
      <div style={{ maxWidth: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "10px" }}>
          <span style={{ marginRight: "5px" }}>View as:</span>
          <Switch
            checkedChildren="Table"
            unCheckedChildren="Grid"
            defaultChecked={tableView}
            onChange={handleViewChange}
          />
          <span style={{ marginLeft: "5px" }}>(Switch between Table and Grid view)</span>
        </div>

        <ArticleSearch onSearch={handleSearch} />
        <ArticleStatistics articles={articles} count={count} />
        <Divider />
        <Typography.Title level={2}>Articles</Typography.Title>

        {tableView ? (
          <div>
            <ArticleTable
              articles={articles}
              loading={false}
            />
          </div>
        ) : (
          <div>
            <ArticleList
              articles={articles}
            />
          </div>
        )}
      </div>
      <Pagination
        total={count}
        pageSize={limit}
        showSizeChanger
        onChange={handlePageChange}
        onShowSizeChange={onShowSizeChange}
        current={Math.floor(offset / limit) + 1}
        style={{ marginTop: "16px", textAlign: "center" }}
      />
    </>
  );
};

export default NewsPage;
