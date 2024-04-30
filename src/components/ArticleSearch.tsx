import { Button, Input } from 'antd';
import React, { useState } from 'react';

const { Search } = Input;

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
            <Search
                placeholder="Search article's title"
                enterButton="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
                style={{ maxWidth: "80%", marginRight: 16 }}
            />
            <Button type="default" onClick={handleClear}>
                Clear
            </Button>
        </div>
    );
};

export default ArticleSearch;
