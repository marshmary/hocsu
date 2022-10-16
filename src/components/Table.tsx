import { Table } from "flowbite-react";
import { FunctionComponent } from "react";

interface AppTableProps {
    heads: string[];
    rows: TableRowData[];
    hasRowOptions?: boolean;
    rowOptions?: JSX.Element;
}

const AppTable: FunctionComponent<AppTableProps> = ({
    heads,
    rows,
    hasRowOptions = false,
    rowOptions,
}) => {
    return (
        <Table hoverable={true}>
            <Table.Head>
                {heads.map((head) => (
                    <Table.HeadCell key={head}>{head}</Table.HeadCell>
                ))}
                {hasRowOptions && (
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                )}
            </Table.Head>
            <Table.Body className="divide-y">
                {rows.map((obj) => (
                    <Table.Row
                        key={obj.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        {Object.keys(obj).map(
                            (key, col) =>
                                key !== "id" && (
                                    <Table.Cell key={obj.id + col}>
                                        {obj[key]}
                                    </Table.Cell>
                                )
                        )}
                        {hasRowOptions && rowOptions && (
                            <Table.Cell>{rowOptions}</Table.Cell>
                        )}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default AppTable;
