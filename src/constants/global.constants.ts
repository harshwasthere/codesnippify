import { Folder, Tag } from "@/types/global.types";
import { bundledLanguagesInfo } from "shiki";

export const langs = bundledLanguagesInfo.map((lang) => ({
    id: lang.id,
    name: lang.name,
}));

export const langIds = langs.map((lang) => lang.id);

export const dummyTags: Tag[] = [
    {
        id: "1",
        name: "Array",
        created_at: "2021-09-01T00:00:00.000Z",
        updated_at: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "2",
        name: "Linked List",
        created_at: "2021-09-01T00:00:00.000Z",
        updated_at: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "3",
        name: "Stacks & Queues",
        created_at: "2021-09-01T00:00:00.000Z",
        updated_at: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "4",
        name: "Trees & Graphs",
        created_at: "2021-09-01T00:00:00.000Z",
        updated_at: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "5",
        name: "Dynamic Programming",
        created_at: "2021-09-01T00:00:00.000Z",
        updated_at: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "6",
        name: "Greedy Algorithms",
        created_at: "2021-09-01T00:00:00.000Z",
        updated_at: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "7",
        name: "Backtracking",
        created_at: "2021-09-01T00:00:00.000Z",
        updated_at: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "8",
        name: "Bit Manipulation",
        created_at: "2021-09-01T00:00:00.000Z",
        updated_at: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "9",
        name: "Maths & Stats",
        created_at: "2021-09-01T00:00:00.000Z",
        updated_at: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "10",
        name: "String Manipulation",
        created_at: "2021-09-01T00:00:00.000Z",
        updated_at: "2021-09-01T00:00:00.000Z",
    },
];
