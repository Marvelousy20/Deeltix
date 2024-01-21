import MenuCard from "../MenuCard";
import { IMenu } from "@/types";
import { MenuData } from "./data";

interface DataProps {
  data: IMenu[];
}

export default function Menu({ data }: DataProps) {
  return <MenuCard data={data} />;
}
