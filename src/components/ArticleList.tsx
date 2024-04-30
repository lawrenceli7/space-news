import { Article } from "@/types/types";
import { Pagination, Row, Skeleton } from "antd";
import { toASCII } from "punycode";
import React from "react";
import ArticleCard from "./ArticleCard";

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
  pageSize: number;
  totalArticles: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}


const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  loading,
  pageSize,
  totalArticles,
  currentPage,
  onPageChange,
}) => (
  <div>
    <Row gutter={[16, 16]}>
      {loading ? (
        <Skeleton active />
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
    </Row>
    <Pagination
      current={currentPage}
      defaultCurrent={1}
      pageSize={pageSize}
      total={totalArticles}
      onChange={onPageChange}
      showSizeChanger
      pageSizeOptions={['10', '20', '30', '40']}
      style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
    />
  </div>
);

export default ArticleList;
