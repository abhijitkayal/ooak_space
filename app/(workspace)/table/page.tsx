import Table from "@/components/table/Table";
import { properties, rows } from "@/data/MockData";

export default function Page() {
  return <Table properties={properties} rows={rows} />;
}