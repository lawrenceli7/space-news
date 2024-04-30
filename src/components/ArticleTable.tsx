import { Article } from "@/types/types";
import { Pagination, Table, Tag } from "antd";
import React from "react";

interface ArticleTableProps {
  articles: Article[];
  loading: boolean;
  pageSize: number;
  totalArticles: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ArticleTable: React.FC<ArticleTableProps> = ({ articles,
  loading,
  pageSize,
  totalArticles,
  currentPage,
  onPageChange, }) => {

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Article) => <a href={record.url} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: "News Source",
      dataIndex: "news_site",
      key: "news_site",
    },
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

  return (
    <>
      <Table
        dataSource={articles}
        columns={columns}
        loading={loading}
        pagination={{
          current: currentPage,
          defaultCurrent: 1,
          pageSize: pageSize,
          total: totalArticles,
          onChange: onPageChange,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '40'],
          style: { display: 'flex', justifyContent: 'center', marginTop: '10px' }
        }}
      />
    </>

  );
};

export default ArticleTable;
