const Search = ({ onSearch }: { onSearch: (query: string) => void }) => {
  return (
    <input
      type="text"
      placeholder="Search contacts..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default Search;
