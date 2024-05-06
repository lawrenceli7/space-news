import { Article } from "@/types/types";
import { Table, Typography } from "antd";

interface ArticleTableProps {
  articles: Article[];
  loading: boolean;
}

const ArticleTable: React.FC<ArticleTableProps> = ({ articles, loading }) => {
  const tableCellStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  const mobileCellStyle = {
    whiteSpace: "normal"
  };

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
      style: tableCellStyle,
    },
    {
      title: "Published At",
      dataIndex: "published_at",
      key: "published_at",
      style: tableCellStyle,
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
      <Table
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
