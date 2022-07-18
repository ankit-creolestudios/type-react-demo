import React from "react";

interface GenericList<T> {
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => number;
  data: T[];
}
const TypeGenericList = <T extends unknown>({
  data,
  renderItem,
  keyExtractor,
}: GenericList<T>) => {
  return (
    <div>
      <div>TypeGenericList</div>
      {data.map((item) => (
        <div>{renderItem(item)}</div>
      ))}
    </div>
  );
};

export default TypeGenericList;
