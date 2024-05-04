import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const { Search: AntdSearch } = Input;

const StyledSearch = styled(AntdSearch)`
    margin-right: 16px;
    max-width: 100%;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 16px;
    max-width: 100%;
`;

const StyledButton = styled(Button)`
    max-width: 100%;
`;

interface ArticleSearchProps {
    onSearch: (query: string) => void;
}

const ArticleSearch: React.FC<ArticleSearchProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            onSearch(searchQuery.trim());
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        onSearch('');
    };

    return (
        <StyledDiv>
            <StyledSearch
                placeholder="Search for an article..."
                enterButton="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
            />
            <StyledButton type="default" onClick={handleClear}>
                Clear
            </StyledButton>
        </StyledDiv>
    );
};

export default ArticleSearch;
