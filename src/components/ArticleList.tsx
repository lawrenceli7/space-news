import { Article } from "@/types/types";
import { Row } from "antd";
import ArticleCard from "./ArticleCard";
interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => (
  <div>
    <Row>
      {articles.map(function (data: Article, idx: number) {
        return <ArticleCard key={idx} article={data} />;
      })}
    </Row>
  </div>
);

export default ArticleList;
