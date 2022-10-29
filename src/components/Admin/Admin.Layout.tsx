import { Button, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import Table from "~/components/Table";
import EventFilter from "~/components/Admin/Admin.EventFilter";
import { useModal } from "~/components/Modal";
import ModalCreate from "./Admin.ModalCreate";
import ModalDelete from "./Admin.ModalDelete";
import { getHistoryEvents } from "~/data/events";
import Loading from "../Loading/Loading";
import Fab from "../Fab";
import ModalEdit from "./Admin.ModalEdit";

const AdminLayout = () => {
    const { open: modalCreate, setOpen: setModalCreate } = useModal();
    const { open: modalDelete, setOpen: setModalDelete } = useModal();
    const { open: modalEdit, setOpen: setModalEdit } = useModal();
    const [selectedEvent, setSelectedEvent] = useState<HistoryEvent>(null!);

    const [rowsData, setRowsData] = useState<TableRowData[]>(null!);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [filter, setFilter] = useState<AdminPageFilter>({
        limit: 50,
        page: 1,
    });

    const fetchData = () => {
        getHistoryEvents(filter)
            .then((result) => {
                setRowsData(
                    result.events.map((event) => ({
                        id: event.id,
                        name: <p>{event.title}</p>,
                        time: <p className="whitespace-nowrap">{event.time}</p>,
                        content: (
                            <p className="truncate sm:whitespace-normal w-72 sm:w-auto">
                                {event.content}
                            </p>
                        ),
                        options: (
                            <span className="flex gap-3">
                                <p
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
                                    onClick={() => {
                                        setModalEdit(true);
                                        setSelectedEvent(event);
                                    }}
                                >
                                    Edit
                                </p>
                                <p
                                    className="font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer"
                                    onClick={() => {
                                        setModalDelete(true);
                                        setSelectedEvent(event);
                                    }}
                                >
                                    Delete
                                </p>
                            </span>
                        ),
                    }))
                );
                setTotalPages(result.totalPages);
            })
            .catch(() => {
                setRowsData([]);
            });
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    const heads = ["Title", "Time", "Content", ""];

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setFilter({ ...filter, page: page });
    };

    return (
        <>
            <div className="bg-[#F0F0F5] w-screen min-h-screen">
                <div className="flex justify-between p-3">
                    <div className="text-2xl font-semibold">
                        Events management page
                    </div>
                    <Button
                        color="success"
                        onClick={() => {
                            setModalCreate(true);
                        }}
                    >
                        Add new
                    </Button>
                </div>
                <div className="p-3">
                    <EventFilter filter={filter} setFilter={setFilter} />
                </div>
                <div className="p-3">
                    {!rowsData ? (
                        <div className="w-full grid place-items-center">
                            <Loading />
                        </div>
                    ) : rowsData && rowsData.length === 0 ? (
                        <div className="w-full grid place-items-center">
                            No item found
                        </div>
                    ) : (
                        <>
                            <Table
                                heads={heads}
                                rows={rowsData}
                                hasRowOptions={false}
                            />
                            {rowsData && totalPages > 1 && (
                                <div className="mt-2 w-full grid place-items-start">
                                    <Pagination
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                        showIcons={true}
                                        totalPages={totalPages}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <ModalCreate
                    open={modalCreate}
                    setOpen={setModalCreate}
                    successCallback={fetchData}
                />
                <ModalDelete
                    open={modalDelete}
                    setOpen={setModalDelete}
                    selected={selectedEvent}
                    successCallback={fetchData}
                />
                <ModalEdit
                    open={modalEdit}
                    setOpen={setModalEdit}
                    selected={selectedEvent}
                    successCallback={fetchData}
                />
            </div>
            <Fab />
        </>
    );
};

export default AdminLayout;
