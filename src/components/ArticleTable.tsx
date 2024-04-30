import { Article } from "@/types/types";
import { Table } from "antd";
interface ArticleTableProps {
  articles: Article[];
  loading: boolean;
}

const ArticleTable: React.FC<ArticleTableProps> = ({ articles, loading, }) => {

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
        pagination={false}
      />
    </>

  );
};

export default ArticleTable;
