import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select";

export default function SearchPanel({ onSearch, search }: { onSearch: (query: any) => void; search: string; }) {
  const [searchType, setSearchType] = useState("address"); // default type
  const [searchValue, setSearchValue] = useState("");
  const [tagName, setTagName] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [limit, setLimit] = useState(100);

  const handleSearch = () => {
    let queryPayload = {};

    if (searchType === "address") {
      queryPayload = { address: searchValue.trim(), limit };
    } else if (searchType === "id") {
      queryPayload = { id: searchValue.trim(), limit };
    } else if (searchType === "tag") {
      queryPayload = {
        tag: {
          name: tagName.trim(),
          value: tagValue.trim(),
        },
        limit
      };
    }

    onSearch(queryPayload); // pass search params back to parent
  };

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center px-5">
      <Select value={searchType} onValueChange={setSearchType}>
        <SelectTrigger>
          <SelectValue placeholder="Search type" />
        </SelectTrigger>
            <SelectContent>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="address">Address</SelectItem>
            <SelectItem value="tag">Tags</SelectItem>
            </SelectContent>
        </Select>
      {/* Dynamic Inputs */}
      {searchType === "tag" ? (
        <div className="flex gap-2">
          <Input
            className="md:w-40 w-full"
            placeholder="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
          <Input
            className="md:w-40 w-full"
            placeholder="Tag Value"
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
          />
        </div>
      ) : (
        <Input
          className="md:w-90 w-full"
          placeholder={`Search by ${searchType}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      )}
      <Input
        className="w-40"
        type="number"
        title="Result Limit (max 1000)"
        value={limit}
        onChange={(e) => {
          const num = Number(e.target.value);
          // TODO: If 0 comes first, strip it off
          setLimit(num);
        }}
      />
      <Button
        onClick={handleSearch}
        id="search-button"
        disabled={limit <= 0 || limit > 1000}
      >
        Search
      </Button>
    </div>
  );
}
