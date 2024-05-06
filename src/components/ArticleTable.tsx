import { Article } from "@/types/types";
import { Table, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const StyledTable = styled(Table)`
  .ant-table-cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 750px) {
    .ant-table-cell {
      white-space: normal;
    }
  }
`;

interface ArticleTableProps {
  articles: Article[];
  loading: boolean;
}

const ArticleTable: React.FC<ArticleTableProps> = ({ articles, loading }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Article) => (
        <a href={record.url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "News Source",
      dataIndex: "news_site",
      key: "news_site",
      ellipsis: true,
    },
    {
      title: "Published At",
      dataIndex: "published_at",
      key: "published_at",
      ellipsis: true,
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
    <div>
      <Typography.Title level={2}>Articles</Typography.Title>
      <StyledTable
        dataSource={articles}
        columns={columns}
        loading={loading}
        pagination={false}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ArticleTable;
