import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const { Search: AntdSearch } = Input;

const StyledSearch = styled(AntdSearch)`
  max-width: 80%;
  margin-right: 16px;
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
        <div>
            <StyledSearch
                placeholder="Search article's title"
                enterButton="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
            />
            <Button type="default" onClick={handleClear}>
                Clear
            </Button>
        </div>
    );
};

export default ArticleSearch;
