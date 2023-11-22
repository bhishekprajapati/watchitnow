"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

export default function Component({ items, children }) {
  return (
    <>
      <Dropdown>
        <DropdownTrigger>{children}</DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" items={items}>
          {(item) => <DropdownItem key={item.name}>{item.name}</DropdownItem>}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
