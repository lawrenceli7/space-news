import { Article } from "@/types/types";
import { Col, Divider, List, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const StyledOuterDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const StyledCol = styled(Col)`
  border-radius: 10px;
  background: #f5f5f5;
  padding-left: 24px;
  outline-style: solid;
  outline-color: #e7e7e7;
  height: 100%;
`;

const StyledTitle = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  text-align: start;
  margin-top: 15px;
`;

const StyledInfo = styled(Typography)`
  font-size: 16px;
  text-align: left;
`;

const StyledInnerDiv = styled.div`
  padding-bottom: 10px;
`;



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
    <div>
      <Typography.Title level={2}>Article Statistics</Typography.Title>
      <StyledOuterDiv>
        <StyledCol span={8}>
          <StyledTitle>Unique News Sources</StyledTitle>
          <Divider />
          <List
            dataSource={uniqueSources}
            renderItem={(source) => (
              <List.Item>
                <StyledInfo>{source}</StyledInfo>
              </List.Item>
            )}
          />
        </StyledCol>
        <StyledCol span={8}>
          <StyledTitle>Date Range of Articles</StyledTitle>
          <StyledInnerDiv>
            <Divider />
            <StyledInfo>{`Earliest: ${dateRange[0]}`}</StyledInfo>
            <Divider />
            <StyledInfo>{`Latest: ${dateRange[1]}`}</StyledInfo>
          </StyledInnerDiv>
        </StyledCol>
        <StyledCol span={8}>
          <StyledTitle>Number of Featured Articles</StyledTitle>
          <Divider />
          <StyledInnerDiv >
            <StyledInfo>Count: {featuredArticlesCount}</StyledInfo>
          </StyledInnerDiv>
        </StyledCol>
      </StyledOuterDiv>
    </div>
  );
};

export default ArticleStatistics;
