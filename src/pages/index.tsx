import LatestArticleSection from "@/components/LatestArticleSection";
import { Typography } from "antd";
import { Inter } from "next/font/google";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <StyledDiv>
        <Typography.Title>Space! News</Typography.Title>
        <Typography.Paragraph>
          Welcome to Space! News, your go-to source for the latest news and
          updates on space exploration, astronomy, and everything in between.
          Our team of experienced journalists and space enthusiasts are
          dedicated to bringing you the most accurate and up-to-date information
          on the latest discoveries, missions, and events happening in the
          cosmos.
        </Typography.Paragraph>
        <Typography.Paragraph>
          From the latest Mars rover missions to the search for extraterrestrial
          life, we cover it all. Our articles are written in an
          easy-to-understand format, so you you do not need to be a rocket
          scientist to enjoy them. We also feature stunning images and videos
          from space, so you can experience the beauty and wonder of the
          universe from the comfort of your own home.
        </Typography.Paragraph>
        <Typography.Paragraph>
          So whether you are a space enthusiast, a science buff, or just someone
          who loves to learn new things, Space! News has something for you. Be
          sure to check back often for the latest updates and stories from the
          final frontier.
        </Typography.Paragraph>
        <LatestArticleSection />
      </StyledDiv>
    </div>
  );
}
