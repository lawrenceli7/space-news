import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        const handleResize = () => {
            const placeholderText = window.innerWidth <= 1000 ? 'Search article...' : 'Search for an article...';
            setSearchPlaceholder(placeholderText);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [searchPlaceholder, setSearchPlaceholder] = useState('Search for an article...');

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
                placeholder={searchPlaceholder}
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
