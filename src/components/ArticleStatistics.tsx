import { Article } from "@/types/types";
import { Col, Divider, List, Row, Typography } from "antd";
import React from "react";

interface ArticleStatisticsProps {
  articles: Article[];
  count: number;
}

const ArticleStatistics: React.FC<ArticleStatisticsProps> = ({ articles }) => {
  const uniqueSources = [
    ...new Set(articles.map((article) => article.news_site)),
  ];

  const dateRange = [
    new Date(
      Math.min(
        ...articles.map((article) => new Date(article.published_at).getTime())
      )
    ).toLocaleDateString(),
    new Date(
      Math.max(
        ...articles.map((article) => new Date(article.published_at).getTime())
      )
    ).toLocaleDateString(),
  ];

  const featuredArticlesCount = articles.filter((article) => article.featured).length;

  return (
    <div style={{}}>
      <Row gutter={16} style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
        <Col span={8} style={{ borderRadius: "10px", background: "#f5f5f5", paddingLeft: "25px", outlineStyle: "solid", outlineColor: "#e7e7e7", maxWidth: "33%", height: "100%" }}>
          <Typography.Title level={4} style={{ fontSize: "15px" }}>Unique News Sources</Typography.Title>
          <List
            dataSource={uniqueSources}
            renderItem={(source) => (
              <List.Item>
                <Typography.Text style={{ fontSize: "15px" }}>{source}</Typography.Text>
              </List.Item>
            )}
          />
        </Col>
        <Col span={8} style={{ borderRadius: "10px", background: "#f5f5f5", paddingLeft: "25px", outlineStyle: "solid", outlineColor: "#e7e7e7", maxWidth: "33%", height: "100%" }}>
          <Typography.Title level={4} style={{ fontSize: "15px" }}>Date Range of Articles</Typography.Title>
          <div style={{ display: "flex", flexDirection: "column", paddingBottom: "10px" }}>
            <Divider />
            <Typography.Text style={{ fontSize: "15px" }}>{`Earliest: ${dateRange[0]}`}</Typography.Text>
            <Divider />
            <Typography.Text style={{ fontSize: "15px" }}>{`Latest: ${dateRange[1]}`}</Typography.Text>
          </div>
        </Col>
        <Col span={8} style={{ borderRadius: "10px", background: "#f5f5f5", paddingLeft: "25px", outlineStyle: "solid", outlineColor: "#e7e7e7", maxWidth: "33%", height: "100%" }}>
          <Typography.Title level={4} style={{ fontSize: "15px" }}>Number of Featured Articles</Typography.Title>
          <Divider />
          <div style={{ paddingBottom: "10px" }}>
            <Typography.Text style={{ fontSize: "15px" }}>Count: {featuredArticlesCount}</Typography.Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ArticleStatistics;
