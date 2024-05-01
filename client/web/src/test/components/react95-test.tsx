"use client";

import { FC } from "react";
import { MenuList, MenuListItem, Separator } from "react95";

interface Props {}

export const React95Test: FC<Props> = ({}) => {
  return (
    <div>
      <h2>React95 Test</h2>
      <MenuList>
        <MenuListItem>🎤 Sing</MenuListItem>
        <MenuListItem>💃🏻 Dance</MenuListItem>
        <MenuListItem>안녕하세요 가나다라마바사</MenuListItem>
        <Separator />
        <MenuListItem disabled>😴 Sleep</MenuListItem>
      </MenuList>
    </div>
  );
};
