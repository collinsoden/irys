import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select";

export default function SearchPanel({ onSearch }: any) {
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
    <div className="w-full mx-auto justify-center flex items-center space-x-4">
      <Select value={searchType} onValueChange={setSearchType}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Search type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="address">Address</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="tag">Tag</SelectItem>
        </SelectContent>
      </Select>

      {/* Dynamic Inputs */}
      {searchType === "tag" ? (
        <div className="flex gap-2">
          <Input
            className="w-40"
            placeholder="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
          <Input
            className="w-40"
            placeholder="Tag Value"
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
          />
        </div>
      ) : (
        <Input
          className="w-90"
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
