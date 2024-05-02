/* eslint-disable @next/next/no-img-element */
import { Article } from "@/types/types";
import { Card, Divider, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import image404 from "../assets/404.png";

const StyledCard = styled(Card)`
  max-width: 32.6%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin: 4px;
  padding: 0;
`;

const StyledTitle = styled(Typography.Title)`
  margin: 8px 0;
  text-decoration: underline;
`;

const StyledImage = styled.img`
  max-width: 100%;
`;

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function getImage(url: string) {
    if (url) {
      return <StyledImage src={article.image_url} alt="none" />;
    } else {
      return <img src={image404.src} alt="error-image" />;
    }
  }

  return (
    <StyledCard
      hoverable
      onClick={() => window.open(article.url, "_blank")}
      title={article.title}
      cover={getImage(article.image_url)}
      extra={new Date(article.published_at).toLocaleDateString("en-US", options)}>
      <StyledTitle
        level={4}>
        {article.title}
        <Divider />
      </StyledTitle>
      <Typography.Paragraph>{article.summary}</Typography.Paragraph>
    </StyledCard>
  );
};

export default ArticleCard;